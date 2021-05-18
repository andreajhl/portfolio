import { shallow } from "enzyme";
import { FullScreenVideoPlayer } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <FullScreenVideoPlayer
      isFullScreen
      onCloseFullScreen={() => {}}
      videoUrl=""
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
