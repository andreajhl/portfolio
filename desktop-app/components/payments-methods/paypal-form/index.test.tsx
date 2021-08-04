// @ts-nocheck
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { getPurchaseSummaryPath } from "constants/paths";
import {
  DotCircle,
  Ellipse,
  PaypalIcon,
} from "desktop-app/components/common/icons";
import WarningMessage from "desktop-app/components/common/warning-message";
import { shallow } from "enzyme";
import waitFor from "react-app/src/utils/waitFor";
import testContract from "__test__/fake-data/testContract";
import { byId, getMockedRouterPush } from "__test__/utils";
import PaypalForm from ".";
import PaypalReactButton from "../paypal-react-button";

const testFormIndex = 0;
const testDiscountCouponId = null;
function shallowRenderPaypalForm(overrideProps = {}) {
  const wrapper = shallow(
    <PaypalForm
      expanded={false}
      index={testFormIndex}
      contractPrice={testContract.price}
      contractReference={testContract.reference}
      onToggle={() => {}}
      celebrityId={testContract.celebrity_id}
      discountCouponId={testDiscountCouponId}
      {...overrideProps}
    />
  );

  return { wrapper };
}

it("renders without crashing", () => {
  const wrapper = shallow(
    <PaypalForm expanded index={2} onToggle={() => {}} />
  );
  expect(wrapper.exists()).toBeTruthy();
});

const processPayPalPayment = jest.spyOn(
  jest.requireActual("react-app/src/state/ducks/payments/actions"),
  "processPayPalPayment"
);

beforeEach(() => {
  processPayPalPayment.mockReset();
});

it("process the payment properly redirecting to purchase summary and tracking purchase", async () => {
  const push = getMockedRouterPush();

  const trackContractPurchase = jest.spyOn(
    require("react-app/src/state/utils/gtm"),
    "trackContractPurchase"
  );

  const { wrapper } = shallowRenderPaypalForm({ expanded: true });
  const successPaymentResponse = {
    status: 10,
    reference: testContract.reference,
  };
  processPayPalPayment.mockImplementationOnce(() =>
    Promise.resolve(successPaymentResponse)
  );

  const onPaypalApproval = wrapper
    .find(PaypalReactButton)
    .invoke("onPayPalButtonApprove");

  const testOrderId = "123";
  const testAuthorizationId = "asd";
  onPaypalApproval(testOrderId, testAuthorizationId);

  expect(processPayPalPayment).toHaveBeenCalledWith(
    testContract.reference,
    testOrderId,
    testAuthorizationId,
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
    getPurchaseSummaryPath(successPaymentResponse.reference)
  );
});

it("it renders <WarningMessage /> with error from payment request", async () => {
  const { wrapper } = shallowRenderPaypalForm({ expanded: true });
  const testErrorMessage = "It fails!";
  processPayPalPayment.mockImplementationOnce(() =>
    Promise.reject(testErrorMessage)
  );

  const onPaypalApproval = wrapper
    .find(PaypalReactButton)
    .invoke("onPayPalButtonApprove");

  const testOrderId = "321";
  const testAuthorizationId = "dsa";
  onPaypalApproval(testOrderId, testAuthorizationId);

  await waitFor(() => wrapper.exists(WarningMessage), 50);

  expect(
    wrapper.containsMatchingElement(
      <WarningMessage message={testErrorMessage} />
    )
  ).toBeTruthy();
});

const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_KEY;
const LOCALE = "es_CO";
it("renders <PayPalScriptProvider /> with proper props", () => {
  const { wrapper } = shallowRenderPaypalForm();

  expect(wrapper.find(PayPalScriptProvider).prop("options")).toEqual({
    intent: "authorize",
    "client-id": CLIENT_ID,
    currency: "USD",
    locale: LOCALE,
    "disable-funding": "credit,card",
  });
});

it("renders <PaypalReactButton /> with proper props", () => {
  const { wrapper } = shallowRenderPaypalForm({ expanded: true });

  expect(
    wrapper.containsMatchingElement(
      <PaypalReactButton
        contractReference={testContract.reference}
        contractPrice={testContract.price}
      />
    )
  ).toBeTruthy();
});

it("renders its content only when expanded prop is true", () => {
  const { wrapper } = shallowRenderPaypalForm();

  const sectionId = `section-${testFormIndex}`;

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

  const { wrapper: anotherWrapper } = shallowRenderPaypalForm({
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
  const collapsedFormLabelWrapper = shallowRenderPaypalForm().wrapper.find(
    formLabelSelector
  );

  expect(
    collapsedFormLabelWrapper.containsMatchingElement(<PaypalIcon />)
  ).toBeTruthy();
  expect(
    collapsedFormLabelWrapper.containsMatchingElement(<Ellipse />)
  ).toBeTruthy();
  expect(
    collapsedFormLabelWrapper.containsMatchingElement(<DotCircle />)
  ).toBeFalsy();

  const expandedFormLabelWrapper = shallowRenderPaypalForm({
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
  const formLabelWrapper = shallowRenderPaypalForm({ onToggle }).wrapper.find(
    formLabelSelector
  );

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
