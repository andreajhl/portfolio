import { shallow } from "enzyme";
import OverlayHeader from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <OverlayHeader
      onTogglePlay={() => {}}
      onToggleAudio={() => {}}
      isPlaying={false}
      IsMuted={false}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
