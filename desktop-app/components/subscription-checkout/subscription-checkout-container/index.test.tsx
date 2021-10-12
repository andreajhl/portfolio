import { shallow } from "enzyme";
import { SubscriptionCheckoutContainer } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<SubscriptionCheckoutContainer />);
  expect(wrapper.exists()).toBeTruthy();
});
