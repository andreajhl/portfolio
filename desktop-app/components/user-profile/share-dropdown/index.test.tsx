import { shallow } from "enzyme";
import { ShareDropdown } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<ShareDropdown />);
  expect(wrapper.exists()).toBeTruthy();
});
