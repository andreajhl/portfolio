import { ContractInfo } from "desktop-app/components/payments-methods/contract-info";
import { ContractInfoSkeleton } from "desktop-app/components/payments-methods/contract-info/skeleton";
import { PaymentsMethodsSelectorCard } from "desktop-app/components/payments-methods/payments-methods-selector-card";
import { PaymentMethodsSelectorCardSkeleton } from "desktop-app/components/payments-methods/payments-methods-selector-card/skeleton";
import { shallow } from "enzyme";
import { contractToPay } from "__test__/fake-data/testContract";
import ReduxProvider from "__test__/ReduxProvider";
import PaymentMethodsPage, {
  PaymentMethodsPage as ConnectedPaymentMethodsPage,
} from ".";

function shallowRenderPaymentMethodsPage(overrideProps = {}) {
  const wrapper = shallow(
    <PaymentMethodsPage
      isLoading={false}
      isCompleted={false}
      contract={{}}
      contractReference={contractToPay.reference}
      getContractToPayData={() => {}}
      {...overrideProps}
    />
  );

  return { wrapper };
}

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <ConnectedPaymentMethodsPage contractReference="123-123-123" />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});

it("renders skeletons when loading contract to pay", () => {
  const { wrapper } = shallowRenderPaymentMethodsPage({ isLoading: true });

  expect(
    wrapper.containsMatchingElement(<ContractInfoSkeleton />)
  ).toBeTruthy();
  expect(wrapper.exists(ContractInfo)).toBeFalsy();
  expect(
    wrapper.containsMatchingElement(<PaymentMethodsSelectorCardSkeleton />)
  ).toBeTruthy();
  expect(wrapper.exists(PaymentsMethodsSelectorCard)).toBeFalsy();
});

it("renders <ContractInfo /> and <PaymentsMethodsSelectorCard /> when has loaded contract to pay", () => {
  const { wrapper } = shallowRenderPaymentMethodsPage({
    isLoading: false,
    isCompleted: true,
  });

  expect(wrapper.containsMatchingElement(<ContractInfoSkeleton />)).toBeFalsy();
  expect(wrapper.exists(ContractInfo)).toBeTruthy();
  expect(
    wrapper.containsMatchingElement(<PaymentMethodsSelectorCardSkeleton />)
  ).toBeFalsy();
  expect(wrapper.exists(PaymentsMethodsSelectorCard)).toBeTruthy();
});

it("fetch contract to pay data on mount", () => {
  const getContractToPayData = jest.fn();
  shallowRenderPaymentMethodsPage({
    getContractToPayData,
  });

  expect(getContractToPayData).toHaveBeenCalledWith(contractToPay.reference);
});
