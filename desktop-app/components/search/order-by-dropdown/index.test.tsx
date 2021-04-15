import { shallow } from "enzyme";
import { OrderByDropdown } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<OrderByDropdown />);
  expect(wrapper.exists()).toBeTruthy();
});