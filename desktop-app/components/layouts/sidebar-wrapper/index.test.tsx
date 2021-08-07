import { shallow } from "enzyme";
import { SidebarWrapper } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<SidebarWrapper />);
  expect(wrapper.exists()).toBeTruthy();
});
