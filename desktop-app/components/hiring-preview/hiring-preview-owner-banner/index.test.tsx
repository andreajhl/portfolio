import { shallow } from "enzyme";
import { HiringPreviewOwnerBanner } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <HiringPreviewOwnerBanner contractReference="123123-123" />
  );
  expect(wrapper.exists()).toBeTruthy();
});
