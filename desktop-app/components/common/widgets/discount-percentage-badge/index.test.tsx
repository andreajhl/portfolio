import { shallow } from "enzyme";
import { DiscountPercentageBadge } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<DiscountPercentageBadge discountPercentage={0.2} />);
  expect(wrapper.exists()).toBeTruthy();
});
