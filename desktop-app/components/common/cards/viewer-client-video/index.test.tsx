import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import ViewerClientVideo from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <ViewerClientVideo
        avatar={""}
        fullName={""}
        username={""}
        videoUrl={""}
        videoPosterUrl={""}
      />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
