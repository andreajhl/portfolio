import { shallow } from "enzyme";
import { InputWithDynamicWidth } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<InputWithDynamicWidth />);
  expect(wrapper.exists()).toBeTruthy();
});
