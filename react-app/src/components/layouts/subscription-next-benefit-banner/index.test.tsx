import { shallow } from "enzyme";
import { SubscriptionNextBenefitBanner } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<SubscriptionNextBenefitBanner />);
  expect(wrapper.exists()).toBeTruthy();
});
