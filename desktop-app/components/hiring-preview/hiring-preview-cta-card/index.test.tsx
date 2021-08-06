import { shallow } from "enzyme";
import { HiringPreviewCTACard } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<HiringPreviewCTACard />);
  expect(wrapper.exists()).toBeTruthy();
});
