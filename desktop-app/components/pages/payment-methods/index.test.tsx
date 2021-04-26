import { shallow } from "enzyme";
import { PaymentMethods } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<PaymentMethods />);
  expect(wrapper.exists()).toBeTruthy();
});