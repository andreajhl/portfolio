import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import VideoActionButtons from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <VideoActionButtons videoURL="" />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
