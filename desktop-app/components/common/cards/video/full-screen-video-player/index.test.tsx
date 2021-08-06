import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { FullScreenVideoPlayer } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <FullScreenVideoPlayer
        isFullScreen
        onCloseFullScreen={() => {}}
        videoUrl=""
      />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
