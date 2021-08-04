import { shallow } from "enzyme";
import { GiftAnimationWrapper } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<GiftAnimationWrapper />);
  expect(wrapper.exists()).toBeTruthy();
});
