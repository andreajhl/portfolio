import { shallow } from "enzyme";
import { SubscriptionViewsNavTabs } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<SubscriptionViewsNavTabs />);
  expect(wrapper.exists()).toBeTruthy();
});
