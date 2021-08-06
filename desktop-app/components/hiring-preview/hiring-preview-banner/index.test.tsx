import { shallow } from "enzyme";
import { HiringPreviewBanner } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<HiringPreviewBanner />);
  expect(wrapper.exists()).toBeTruthy();
});
