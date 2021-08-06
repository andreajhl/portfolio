// @ts-nocheck
import { shallow } from "enzyme";
import testContract from "__test__/fake-data/testContract";
import { testPaymentMethodsAvailable } from "__test__/fake-data/testPaymentMethods";
import ReduxProvider from "__test__/ReduxProvider";
import PaymentsMethodsSelectorCard, {
  PaymentsMethodsSelectorCard as ConnectedPaymentsMethodsSelectorCard,
} from ".";
import { CouponForm } from "../coupon-form";
import { DLocalPersonalInfoForm } from "../dLocal-personal-info-form";
import PaymentMethodsAvailableList from "../payment-methods-available-list";
import { PaymentMethodsSelectorCardSkeleton } from "./skeleton";

const testCurrencyExchangeData = { to: "USD" };

function shallowRenderPaymentsMethodsSelectorCard(overrideProps = {}) {
  const wrapper = shallow(
    <PaymentsMethodsSelectorCard
      contractPrice={testContract.price}
      contractReference={testContract.reference}
      celebrityId={testContract.celebrity_id}
      userInformation={{}}
      userInformationLoading={false}
      userInformationCompleted={false}
      currencyExchangeData={testCurrencyExchangeData}
      currencyExchangeLoading={false}
      paymentGatewayLoading={false}
      paymentMethodsAvailable={[]}
      couponData={{
        data: {},
        loading: false,
        completed: false,
        error_data: null,
      }}
      getToken={() => {}}
      listPaymentGateways={() => {}}
      {...overrideProps}
    />
  );

  return { wrapper };
}

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <ConnectedPaymentsMethodsSelectorCard
        contractPrice={testContract.price}
        contractReference={testContract.reference}
        celebrityId={testContract.celebrity_id}
      />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});

it("renders its skeleton without crashing", () => {
  const wrapper = shallow(<PaymentMethodsSelectorCardSkeleton />);
  expect(wrapper.exists()).toBeTruthy();
});

it("fetches user's information", () => {
  const getToken = jest.fn();
  shallowRenderPaymentsMethodsSelectorCard({ getToken });
  expect(getToken).toHaveBeenCalled();
});

it("fetches payments gateway information of current currency", () => {
  const listPaymentGateways = jest.fn();
  const currencyExchangeData = { to: "USD" };
  shallowRenderPaymentsMethodsSelectorCard({
    listPaymentGateways,
    currencyExchangeData,
  });
  expect(listPaymentGateways).toHaveBeenCalledWith(currencyExchangeData.to);
});

it("renders its skeleton when loading user's information and/or payments gateway information", () => {
  const { wrapper } = shallowRenderPaymentsMethodsSelectorCard({
    userInformationLoading: true,
    paymentGatewayLoading: true,
  });

  expect(
    wrapper.containsMatchingElement(<PaymentMethodsSelectorCardSkeleton />)
  ).toBeTruthy();
});

it("renders <PaymentMethodsAvailableList /> properly", () => {
  const { wrapper } = shallowRenderPaymentsMethodsSelectorCard({
    paymentMethodsAvailable: testPaymentMethodsAvailable,
  });

  expect(
    wrapper.containsMatchingElement(
      <PaymentMethodsAvailableList
        payment_methods={testPaymentMethodsAvailable as any}
        contractPrice={testContract.price}
        contractReference={testContract.reference}
        celebrityId={testContract.celebrity_id}
      />
    )
  ).toBeTruthy();
});

const validDLocalPaymentMethod = {
  paymentMethodType: "CREDIT_CARD",
  availablePaymentMethods: [
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
  ],
};
it("renders <DLocalPersonalInfoForm /> when DLocal payments are available", () => {
  const { wrapper } = shallowRenderPaymentsMethodsSelectorCard({
    paymentMethodsAvailable: [validDLocalPaymentMethod],
  });

  expect(
    wrapper.containsMatchingElement(
      <DLocalPersonalInfoForm currency={testCurrencyExchangeData.to} />
    )
  ).toBeTruthy();
});

it("renders <CouponForm /> properly", () => {
  const { wrapper } = shallowRenderPaymentsMethodsSelectorCard();
  expect(
    wrapper.containsMatchingElement(
      <CouponForm contractReference={testContract.reference} />
    )
  ).toBeTruthy();
});
