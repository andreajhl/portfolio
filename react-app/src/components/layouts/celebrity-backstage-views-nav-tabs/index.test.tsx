import { shallow } from "enzyme";
import { CelebrityBackstageViewsNavTabs } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<CelebrityBackstageViewsNavTabs />);
  expect(wrapper.exists()).toBeTruthy();
});
