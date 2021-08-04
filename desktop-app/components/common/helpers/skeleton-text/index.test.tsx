import { shallow } from "enzyme";
import { SkeletonText } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<SkeletonText />);
  expect(wrapper.exists()).toBeTruthy();
});