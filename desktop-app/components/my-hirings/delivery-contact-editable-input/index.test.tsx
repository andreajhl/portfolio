import { shallow } from "enzyme";
import { DeliveryContactEditableInput } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<DeliveryContactEditableInput deliveryContact="" />);
  expect(wrapper.exists()).toBeTruthy();
});
