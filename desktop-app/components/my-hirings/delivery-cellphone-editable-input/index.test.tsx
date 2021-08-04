import { shallow } from "enzyme";
import { DeliveryCellphoneEditableInput } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<DeliveryCellphoneEditableInput />);
  expect(wrapper.exists()).toBeTruthy();
});