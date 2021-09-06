import { shallow } from "enzyme";
import { NavTabs } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<NavTabs />);
  expect(wrapper.exists()).toBeTruthy();
});
