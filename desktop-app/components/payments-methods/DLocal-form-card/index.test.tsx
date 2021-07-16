import { shallow } from "enzyme";
import { testPaymentMethodsAvailable } from "__test__/fake-data/testPaymentMethods";
import DLocalFormCard from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <DLocalFormCard paymentsMethodsAvailable={testPaymentMethodsAvailable} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
