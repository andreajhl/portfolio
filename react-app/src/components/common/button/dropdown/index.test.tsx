import { shallow } from "enzyme";
import { DropDown } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<DropDown />);
  expect(wrapper.exists()).toBeTruthy();
});
