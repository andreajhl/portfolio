import { shallow } from "enzyme";
import { SidebarTopBar } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<SidebarTopBar />);
  expect(wrapper.exists()).toBeTruthy();
});