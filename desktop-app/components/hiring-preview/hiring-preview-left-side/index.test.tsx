import { shallow } from "enzyme";
import { HiringPreviewLeftSide } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<HiringPreviewLeftSide />);
  expect(wrapper.exists()).toBeTruthy();
});
