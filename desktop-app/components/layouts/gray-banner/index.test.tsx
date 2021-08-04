import { shallow } from "enzyme";
import { GrayBanner } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<GrayBanner />);
  expect(wrapper.exists()).toBeTruthy();
});