import { shallow } from "enzyme";
import DLocalPaymentMethodForm from ".";

const testPaymentsMethodsAvailable = [
  {
    id: 1,
    identifier: "DLocal",
    name: "test",
    brand: "test",
    redirect: false,
    logo: "test.png",
  },
];

const testBuyerData = {
  buyer_name: "",
  email_address: "",
  identification_document: "",
};

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
