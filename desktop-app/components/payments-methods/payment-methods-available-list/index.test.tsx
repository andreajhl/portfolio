// @ts-nocheck
import { shallow } from "enzyme";
import testContract from "__test__/fake-data/testContract";
import {
  testPaymentMethodsAvailable,
  testPaypalPaymentMethod,
  testStripePaymentMethod,
} from "__test__/fake-data/testPaymentMethods";
import PaymentMethodsAvailableList from ".";
import DLocalPaymentMethodForm from "../dLocal-payment-method-form";
import PaypalForm from "../paypal-form";
import StripeForm from "../stripe-form";

const initialBuyerData = {
  buyer_name: "Test Doe",
  email_address: "testing@test.com",
  identification_document: "20202020",
};

function shallowRenderPaymentMethodsAvailableList(overrideProps = {}) {
  const wrapper = shallow(
    <PaymentMethodsAvailableList
      payment_methods={testPaymentMethodsAvailable as any}
      contractPrice={testContract.price}
      contractReference={testContract.reference}
      buyerData={initialBuyerData}
      discountCouponId={null}
      celebrityId={testContract.celebrity_id}
      onBuyerDataIncomplete={() => {}}
      {...overrideProps}
    />
  );

  function toggleOption(optionSelector) {
    wrapper.find(optionSelector).invoke("onToggle")();
  }

  return { wrapper, toggleOption };
}

it("renders without crashing", () => {
  const { wrapper } = shallowRenderPaymentMethodsAvailableList();
  expect(wrapper.exists()).toBeTruthy();
});

it("renders payment methods forms corresponding to payments_methods list", () => {
  const onBuyerDataIncomplete = () => {};
  const { wrapper } = shallowRenderPaymentMethodsAvailableList({
    onBuyerDataIncomplete,
  });

  expect(
    wrapper.containsMatchingElement(
      <PaypalForm
        expanded={false}
        contractPrice={testContract.price}
        contractReference={testContract.reference}
        celebrityId={testContract.celebrity_id}
      />
    )
  ).toBeTruthy();
  expect(
    wrapper.containsMatchingElement(
      <DLocalPaymentMethodForm
        paymentMethodType="CREDIT_CARD"
        expanded={false}
        buyerData={initialBuyerData}
        contractPrice={testContract.price}
        contractReference={testContract.reference}
        celebrityId={testContract.celebrity_id}
        handleBuyerDataIncomplete={onBuyerDataIncomplete}
      />
    )
  ).toBeTruthy();
  expect(
    wrapper.containsMatchingElement(
      <DLocalPaymentMethodForm
        paymentMethodType="BANK_TRANSFER"
        expanded={false}
        buyerData={initialBuyerData}
        contractPrice={testContract.price}
        contractReference={testContract.reference}
        celebrityId={testContract.celebrity_id}
        handleBuyerDataIncomplete={onBuyerDataIncomplete}
      />
    )
  ).toBeTruthy();
  expect(
    wrapper.containsMatchingElement(
      <DLocalPaymentMethodForm
        paymentMethodType="TICKET"
        expanded={false}
        buyerData={initialBuyerData}
        contractPrice={testContract.price}
        contractReference={testContract.reference}
        celebrityId={testContract.celebrity_id}
        handleBuyerDataIncomplete={onBuyerDataIncomplete}
      />
    )
  ).toBeTruthy();
  expect(
    wrapper.containsMatchingElement(
      <StripeForm
        expanded={false}
        contractPrice={testContract.price}
        contractReference={testContract.reference}
        celebrityId={testContract.celebrity_id}
      />
    )
  ).toBeFalsy();
});

it("renders Stripe payment method form only when is available", () => {
  const { wrapper } = shallowRenderPaymentMethodsAvailableList({
    payment_methods: [...testPaymentMethodsAvailable, testStripePaymentMethod],
  });

  expect(
    wrapper.containsMatchingElement(
      <StripeForm
        expanded={false}
        contractPrice={testContract.price}
        contractReference={testContract.reference}
        celebrityId={testContract.celebrity_id}
      />
    )
  ).toBeTruthy();
});

it("renders DLocal payment method forms only when is available", () => {
  const { wrapper } = shallowRenderPaymentMethodsAvailableList({
    payment_methods: [testPaypalPaymentMethod, testStripePaymentMethod],
  });

  expect(
    wrapper.containsMatchingElement(
      <StripeForm
        expanded={false}
        contractPrice={testContract.price}
        contractReference={testContract.reference}
        celebrityId={testContract.celebrity_id}
      />
    )
  ).toBeTruthy();
  expect(
    wrapper.containsMatchingElement(
      <PaypalForm
        expanded={false}
        contractPrice={testContract.price}
        contractReference={testContract.reference}
        celebrityId={testContract.celebrity_id}
      />
    )
  ).toBeTruthy();
  expect(
    wrapper.containsMatchingElement(<DLocalPaymentMethodForm />)
  ).toBeFalsy();
});

it("expands payment method form when toggle it", () => {
  const { wrapper, toggleOption } = shallowRenderPaymentMethodsAvailableList({
    payment_methods: [...testPaymentMethodsAvailable, testStripePaymentMethod],
  });

  toggleOption(PaypalForm);
  expect(
    wrapper.containsMatchingElement(<PaypalForm expanded={true} />)
  ).toBeTruthy();

  toggleOption(StripeForm);
  expect(
    wrapper.containsMatchingElement(<StripeForm expanded={true} />)
  ).toBeTruthy();

  toggleOption(`DLocalPaymentMethodForm[paymentMethodType="BANK_TRANSFER"]`);
  expect(
    wrapper.containsMatchingElement(
      <DLocalPaymentMethodForm
        paymentMethodType="BANK_TRANSFER"
        expanded={true}
      />
    )
  ).toBeTruthy();

  toggleOption(`DLocalPaymentMethodForm[paymentMethodType="TICKET"]`);
  expect(
    wrapper.containsMatchingElement(
      <DLocalPaymentMethodForm paymentMethodType="TICKET" expanded={true} />
    )
  ).toBeTruthy();

  toggleOption(`DLocalPaymentMethodForm[paymentMethodType="CREDIT_CARD"]`);
  expect(
    wrapper.containsMatchingElement(
      <DLocalPaymentMethodForm
        paymentMethodType="CREDIT_CARD"
        expanded={true}
      />
    )
  ).toBeTruthy();
});
