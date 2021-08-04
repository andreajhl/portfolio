import { shallow } from "enzyme";
import testContract from "__test__/fake-data/testContract";
import StripeCardForm from ".";
import waitFor from "react-app/src/utils/waitFor";
import { getMockedRouterPush } from "__test__/utils";
import {
  getPurchaseSummaryPath,
  getStripe3dSecureIframePath,
  getStripe3dSecureResponsePath,
} from "constants/paths";
import WarningMessage from "desktop-app/components/common/warning-message";

// TODO
// check onChange <CardElement />

function MockedCardElement(props) {
  return null;
}

jest.mock("react-stripe-elements", () => ({
  injectStripe: (Component) => Component,
  CardElement: MockedCardElement,
}));

const testDiscountCouponId = null;

const mockedCreateSource = jest.fn();

const mockedStripe = {
  createSource: mockedCreateSource,
};

function shallowRenderStripeCardForm(overrideProps = {}) {
  const wrapper = shallow(
    <StripeCardForm
      discountCouponId={testDiscountCouponId}
      contractPrice={testContract.price}
      contractReference={testContract.reference}
      celebrityId={testContract.celebrity_id}
      stripe={mockedStripe}
      {...overrideProps}
    />
  );

  function submitForm() {
    wrapper.find("form").invoke("onSubmit")({ preventDefault() {} } as any);
  }

  return { wrapper, submitForm };
}

const processStripePayment = jest.spyOn(
  jest.requireActual("react-app/src/state/ducks/payments/actions"),
  "processStripePayment"
);

beforeEach(() => {
  processStripePayment.mockReset();
  mockedCreateSource.mockReset();
});

it("renders without crashing", () => {
  const { wrapper } = shallowRenderStripeCardForm();
  expect(wrapper.exists()).toBeTruthy();
});

const stripeNormalSucceededResponse = {
  source: {
    id: "testing normal flow",
    status: "chargeable",
    card: { three_d_secure: "optional" },
  },
};

it("renders its form fields and <CardElement /> properly", async () => {
  processStripePayment
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.resolve());
  mockedCreateSource
    .mockImplementation(() => Promise.resolve(stripeNormalSucceededResponse))
    .mockImplementationOnce(() =>
      Promise.resolve(stripeNormalSucceededResponse)
    );
  const { wrapper, submitForm } = shallowRenderStripeCardForm();

  const initialInputsValue = "";
  submitForm();
  await Promise.resolve();

  expect(mockedCreateSource).toHaveBeenCalledWith(
    expect.objectContaining({
      owner: {
        email: initialInputsValue,
        name: initialInputsValue,
      },
    })
  );

  const nameFieldSelector = "Field#name";
  const emailFieldSelector = "Field#email";

  expect(wrapper.find(nameFieldSelector).prop("value")).toBe(
    initialInputsValue
  );
  expect(wrapper.find(emailFieldSelector).prop("value")).toBe(
    initialInputsValue
  );
  expect(wrapper.containsMatchingElement(<MockedCardElement />)).toBeTruthy();

  const newNameValue = "Testing Doe";
  wrapper.find(nameFieldSelector).invoke("onChange")({
    target: {
      value: newNameValue,
    },
  } as any);
  const newEmailValue = "test@Doe.com";
  wrapper.find(emailFieldSelector).invoke("onChange")({
    target: {
      value: newEmailValue,
    },
  } as any);

  // it changes inputs values.
  expect(wrapper.find(nameFieldSelector).prop("value")).toBe(newNameValue);
  expect(wrapper.find(emailFieldSelector).prop("value")).toBe(newEmailValue);

  submitForm();
  await Promise.resolve();

  // it changes owner data.
  expect(mockedCreateSource).toHaveBeenCalledWith(
    expect.objectContaining({
      owner: {
        email: newEmailValue,
        name: newNameValue,
      },
    })
  );
});

it("process the payment properly redirecting to purchase summary and tracking the purchase", async () => {
  const succeededPaymentResponse = {
    data: { status: "OK", data: { reference: testContract.reference } },
  };
  processStripePayment.mockImplementationOnce(() =>
    Promise.resolve(succeededPaymentResponse)
  );
  mockedCreateSource.mockImplementationOnce(() =>
    Promise.resolve(stripeNormalSucceededResponse)
  );
  const push = getMockedRouterPush();

  const trackContractPurchase = jest.spyOn(
    require("react-app/src/state/utils/gtm"),
    "trackContractPurchase"
  );

  const { submitForm } = shallowRenderStripeCardForm();

  submitForm();
  expect(mockedCreateSource).toHaveBeenCalledWith({
    currency: "USD",
    owner: {
      email: "",
      name: "",
    },
    type: "card",
    usage: "reusable",
  });
  await Promise.resolve();

  expect(processStripePayment).toHaveBeenCalledWith(
    testContract.reference,
    stripeNormalSucceededResponse.source.id,
    testDiscountCouponId
  );

  await Promise.resolve();
  // it tracks purchase when it is succeeded.
  expect(trackContractPurchase).toHaveBeenCalledWith({
    celebrityId: testContract.celebrity_id,
    contractPrice: testContract.price,
  });
  // it redirects to purchase summary page.
  expect(push).toHaveBeenCalledWith(
    getPurchaseSummaryPath(succeededPaymentResponse.data.data.reference)
  );
});

const stripe3DFlowSucceededResponse = {
  source: {
    id: "testing normal flow",
    status: "chargeable",
    card: { three_d_secure: "required" },
  },
};

it("redirects to 3D Secure flow when needed", async () => {
  const testRedirectUrl = "test.com";
  mockedCreateSource
    .mockImplementationOnce(() =>
      Promise.resolve(stripe3DFlowSucceededResponse)
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        source: { redirect: { url: testRedirectUrl } },
      })
    );
  const push = getMockedRouterPush();

  const { submitForm } = shallowRenderStripeCardForm();

  submitForm();
  await Promise.resolve();

  expect(mockedCreateSource).toHaveBeenLastCalledWith({
    amount: testContract.price * 100,
    currency: "USD",
    owner: {
      email: "",
      name: "",
    },
    redirect: {
      return_url: expect.stringContaining(
        getStripe3dSecureResponsePath(testContract.reference)
      ),
    },
    three_d_secure: {
      card: stripe3DFlowSucceededResponse.source.id,
    },
    type: "three_d_secure",
  });

  await Promise.resolve();

  // it redirects to IFrame page.
  expect(push).toHaveBeenCalledWith({
    pathname: getStripe3dSecureIframePath(testContract.reference),
    query: { url: testRedirectUrl },
  });
});

it("it renders <ErrorMessage /> with error from payment request", async () => {
  const testErrorMessage = "It fails!";
  const testResponseError = {
    response: {
      data: { status: "ERROR", error: testErrorMessage },
    },
  };
  processStripePayment.mockRejectedValueOnce(testResponseError);
  mockedCreateSource.mockResolvedValueOnce(stripeNormalSucceededResponse);
  const { wrapper, submitForm } = shallowRenderStripeCardForm();

  submitForm();

  await waitFor(() => wrapper.exists(WarningMessage), 50);

  expect(
    wrapper.containsMatchingElement(
      <WarningMessage message={testErrorMessage} />
    )
  ).toBeTruthy();
});
