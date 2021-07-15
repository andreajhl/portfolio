// @ts-nocheck
import { USER_IP_ADDRESS } from "constants/keys";
import { getPurchaseSummaryPath } from "constants/paths";
import {
  CardIcon,
  DotCircle,
  Ellipse,
} from "desktop-app/components/common/icons";
import WarningMessage from "desktop-app/components/common/warning-message";
import { shallow } from "enzyme";
import { generateDeviceId } from "react-app/src/utils/generateDeviceId";
import waitFor from "react-app/src/utils/waitFor";
import testContract from "__test__/fake-data/testContract";
import { byId, getMockedRouterPush } from "__test__/utils";
import DLocalPaymentMethodForm from ".";
import DLocalFormCard from "../DLocal-form-card";
import DLocalSelectPaymentMethod from "../DLocal-select-payment-method";

const testPaymentMethodType = "CREDIT_CARD";

const testPaymentsMethodsAvailable = [
  {
    id: 5,
    identifier: "CARD",
    name: "Mastercard",
    brand: "MC",
    redirect: false,
    logo: "https://pay.dlocal.com/views/2.0/images/payments/MC.png",
  },
  {
    id: 2,
    identifier: "CARD",
    name: "Visa",
    brand: "VI",
    redirect: false,
    logo: "https://pay.dlocal.com/views/2.0/images/payments/VI.png",
  },
];

const testBuyerData = {
  buyer_name: "",
  email_address: "",
  identification_document: "",
};

const testFormIndex = 0;
const testCouponId = null;

const sectionId = `section-${testFormIndex}`;

function shallowRenderDLocalPaymentMethodForm(overrideProps = {}) {
  const wrapper = shallow(
    <DLocalPaymentMethodForm
      paymentMethodType={testPaymentMethodType}
      paymentsMethodsAvailable={testPaymentsMethodsAvailable}
      expanded={false}
      index={testFormIndex}
      discountCouponId={testCouponId}
      buyerData={testBuyerData}
      onToggle={() => {}}
      contractReference={testContract.reference}
      handleBuyerDataIncomplete={() => {}}
      celebrityId={testContract.celebrity_id}
      contractPrice={testContract.price}
      {...overrideProps}
    />
  );

  function startRegisterPayment(...params) {
    wrapper
      .find(byId(sectionId))
      .children()
      .first()
      .invoke("handleStartPayment")(...params);
  }

  return { wrapper, startRegisterPayment };
}

it("renders without crashing", () => {
  const wrapper = shallow(
    <DLocalPaymentMethodForm
      paymentMethodType="CREDIT_CARD"
      paymentsMethodsAvailable={testPaymentsMethodsAvailable}
      expanded
      index={0}
      discountCouponId={null}
      buyerData={testBuyerData}
      onToggle={() => {}}
      contractReference="123-123-123"
      handleBuyerDataIncomplete={() => {}}
      celebrityId={0}
      contractPrice={100}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});

const processDLocalPayment = jest.spyOn(
  jest.requireActual("react-app/src/state/ducks/payments/actions"),
  "processDlocalPayment"
);

const getIpAddress = jest.spyOn(
  jest.requireActual("react-app/src/state/utils/localizationApiService"),
  "getIpAddress"
);

beforeEach(() => {
  processDLocalPayment.mockReset();
  getIpAddress.mockReset();
});

it("calls handleBuyerDataIncomplete prop when has invalid buyerData", () => {
  const handleBuyerDataIncomplete = jest.fn();
  const { startRegisterPayment } = shallowRenderDLocalPaymentMethodForm({
    handleBuyerDataIncomplete,
    expanded: true,
  });

  startRegisterPayment();

  expect(handleBuyerDataIncomplete).toHaveBeenCalled();
});

it("renders <DLocalFormCard /> instead of <DLocalSelectPaymentMethod /> when paymentMethodType is a DLocal payment method with card required", () => {
  const { wrapper } = shallowRenderDLocalPaymentMethodForm({ expanded: true });

  expect(
    wrapper.containsMatchingElement(
      <DLocalFormCard
        paymentMethodType={testPaymentMethodType}
        paymentsMethodsAvailable={testPaymentsMethodsAvailable}
        paymentInProcess={false}
        disabled={false}
      />
    )
  ).toBeTruthy();
  expect(wrapper.exists(DLocalSelectPaymentMethod)).toBeFalsy();
});

it("renders <DLocalSelectPaymentMethod /> instead of <DLocalFormCard /> when paymentMethodType is not a DLocal payment method with card required", () => {
  const paymentMethodType = "TICKET";
  const { wrapper } = shallowRenderDLocalPaymentMethodForm({
    expanded: true,
    paymentMethodType,
  });

  expect(
    wrapper.containsMatchingElement(
      <DLocalSelectPaymentMethod
        paymentMethodType={paymentMethodType}
        paymentsMethodsAvailable={testPaymentsMethodsAvailable}
        paymentInProcess={false}
        disabled={false}
      />
    )
  ).toBeTruthy();
  expect(wrapper.exists(DLocalFormCard)).toBeFalsy();
});

const validBuyerData = {
  buyer_name: "Test Doe",
  email_address: "testing@test.com",
  identification_document: "20202020",
};

it("loads the user's IP from USER_IP_ADDRESS cookie", async () => {
  const succeededPaymentResponse = { chargeStatus: "PAID" };
  processDLocalPayment.mockImplementationOnce(() =>
    Promise.resolve(succeededPaymentResponse)
  );

  const fakeIp = "123.456.789";

  const getCookie = jest
    .spyOn(require("react-app/src/utils/getCookie"), "default")
    .mockImplementationOnce(() => fakeIp);

  const { startRegisterPayment } = shallowRenderDLocalPaymentMethodForm({
    expanded: true,
    buyerData: validBuyerData,
  });

  const testToken = "321";
  const testOption = {
    name: "Visa",
    paymentMethodId: 1,
  };

  startRegisterPayment(testToken, testOption);
  await Promise.resolve();

  expect(getCookie).toHaveBeenCalledWith(USER_IP_ADDRESS);

  expect(processDLocalPayment).toHaveBeenCalledWith(
    testContract.reference,
    testOption.paymentMethodId,
    validBuyerData.buyer_name,
    validBuyerData.email_address,
    validBuyerData.identification_document,
    testCouponId,
    testToken,
    generateDeviceId().toString(),
    fakeIp
  );
});

it("process the succeeded payment properly tracking the purchase and redirect to purchase summary", async () => {
  const succeededPaymentResponse = { chargeStatus: "PAID" };
  processDLocalPayment.mockImplementationOnce(() =>
    Promise.resolve(succeededPaymentResponse)
  );
  const fakeIp = "123.456.789";
  getIpAddress.mockImplementationOnce(() => Promise.resolve(fakeIp));
  const push = getMockedRouterPush();
  const trackContractPurchase = jest.spyOn(
    require("react-app/src/state/utils/gtm"),
    "trackContractPurchase"
  );

  const { startRegisterPayment } = shallowRenderDLocalPaymentMethodForm({
    expanded: true,
    buyerData: validBuyerData,
  });

  const testToken = "321";
  const testOption = {
    name: "Visa",
    paymentMethodId: 1,
  };

  startRegisterPayment(testToken, testOption);
  await Promise.resolve();

  expect(processDLocalPayment).toHaveBeenCalledWith(
    testContract.reference,
    testOption.paymentMethodId,
    validBuyerData.buyer_name,
    validBuyerData.email_address,
    validBuyerData.identification_document,
    testCouponId,
    testToken,
    generateDeviceId().toString(),
    fakeIp
  );
  await Promise.resolve();

  // it tracks purchase when it is succeeded.
  expect(trackContractPurchase).toHaveBeenCalledWith({
    celebrityId: testContract.celebrity_id,
    contractPrice: testContract.price,
  });

  // it redirects to purchase summary page.
  expect(push).toHaveBeenCalledWith(
    getPurchaseSummaryPath(testContract.reference)
  );
});

it("disables the form while it is processing the payment", async () => {
  const failedPaymentResponse = { chargeStatus: "FAIL" };
  processDLocalPayment.mockImplementation(() =>
    Promise.resolve(failedPaymentResponse)
  );

  const {
    wrapper,
    startRegisterPayment,
  } = shallowRenderDLocalPaymentMethodForm({
    expanded: true,
    buyerData: validBuyerData,
  });

  const testToken = "321";
  const testOption = {
    name: "Visa",
    paymentMethodId: 1,
  };

  startRegisterPayment(testToken, testOption);
  await Promise.resolve();
  expect(wrapper.find(byId(sectionId)).children().first().props()).toEqual(
    expect.objectContaining({ disabled: true, paymentInProcess: true })
  );

  await Promise.resolve();
  expect(wrapper.find(byId(sectionId)).children().first().props()).toEqual(
    expect.objectContaining({ disabled: false, paymentInProcess: false })
  );
});

it("it renders <WarningMessage /> with error from payment request", async () => {
  const {
    wrapper,
    startRegisterPayment,
  } = shallowRenderDLocalPaymentMethodForm({
    expanded: true,
    buyerData: validBuyerData,
  });
  const testErrorMessage = "It fails!";
  processDLocalPayment.mockImplementationOnce(() =>
    Promise.reject(testErrorMessage)
  );

  const testToken = "321";
  const testOption = {
    name: "Visa",
    paymentMethodId: 1,
  };
  startRegisterPayment(testToken, testOption);

  await waitFor(() => wrapper.exists(WarningMessage), 50);

  expect(
    wrapper.containsMatchingElement(
      <WarningMessage message={testErrorMessage} />
    )
  ).toBeTruthy();
});

it("renders its content only when expanded prop is true", () => {
  const { wrapper } = shallowRenderDLocalPaymentMethodForm();

  expect(
    wrapper.containsMatchingElement(
      <div
        role="region"
        aria-labelledby={`label-${testFormIndex}`}
        id={sectionId}
        hidden={true}
      />
    )
  ).toBeTruthy();

  const { wrapper: anotherWrapper } = shallowRenderDLocalPaymentMethodForm({
    expanded: true,
  });

  expect(
    anotherWrapper.containsMatchingElement(
      <div
        role="region"
        aria-labelledby={`label-${testFormIndex}`}
        id={sectionId}
        hidden={true}
      />
    )
  ).toBeFalsy();
  expect(
    anotherWrapper.find(byId(sectionId)).children().length
  ).toBeGreaterThan(0);
});

const formLabelSelector = `div[role="button"]`;

it("renders its form label properly", () => {
  const collapsedFormLabelWrapper = shallowRenderDLocalPaymentMethodForm().wrapper.find(
    formLabelSelector
  );

  expect(
    collapsedFormLabelWrapper.containsMatchingElement(<CardIcon />)
  ).toBeTruthy();
  expect(
    collapsedFormLabelWrapper.containsMatchingElement(<Ellipse />)
  ).toBeTruthy();
  expect(
    collapsedFormLabelWrapper.containsMatchingElement(<DotCircle />)
  ).toBeFalsy();

  const expandedFormLabelWrapper = shallowRenderDLocalPaymentMethodForm({
    expanded: true,
  }).wrapper.find(formLabelSelector);
  expect(
    expandedFormLabelWrapper.containsMatchingElement(<DotCircle />)
  ).toBeTruthy();
  expect(
    expandedFormLabelWrapper.containsMatchingElement(<Ellipse />)
  ).toBeFalsy();
});

it("calls onToggle when click or press either Enter or Space keys on form label", () => {
  const onToggle = jest.fn();
  const formLabelWrapper = shallowRenderDLocalPaymentMethodForm({
    onToggle,
  }).wrapper.find(formLabelSelector);

  formLabelWrapper.invoke("onClick")(null);
  expect(onToggle).toHaveBeenCalled();

  const anyKeyEvent = { key: "a" } as any;
  formLabelWrapper.invoke("onKeyDown")(anyKeyEvent);
  expect(onToggle).toHaveBeenCalledTimes(1);

  const enterKeyEvent = { key: "Enter" } as any;
  formLabelWrapper.invoke("onKeyDown")(enterKeyEvent);
  expect(onToggle).toHaveBeenCalledTimes(2);

  const spaceKeyEvent = { key: " " } as any;
  formLabelWrapper.invoke("onKeyDown")(spaceKeyEvent);
  expect(onToggle).toHaveBeenCalledTimes(3);
});
