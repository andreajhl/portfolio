import { shallow } from "enzyme";
import { DeliveryCellphoneInput } from "./";

it("renders without crashing", () => {
  const wrapper = shallow(<DeliveryCellphoneInput />);
  expect(wrapper.exists()).toBeTruthy();
});