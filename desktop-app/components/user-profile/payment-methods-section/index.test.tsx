import { shallow } from "enzyme";
import { PaymentMethodsSection } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<PaymentMethodsSection />);
  expect(wrapper.exists()).toBeTruthy();
});