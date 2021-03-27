import { shallow } from "enzyme";
import { AccountDropdown } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<AccountDropdown />);
  expect(wrapper.exists()).toBeTruthy();
});
