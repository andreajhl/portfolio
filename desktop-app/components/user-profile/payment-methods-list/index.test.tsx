import { shallow } from "enzyme";
import { PaymentMethodsList } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<PaymentMethodsList />);
  expect(wrapper.exists()).toBeTruthy();
});