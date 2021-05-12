import { shallow } from "enzyme";
import ViewerClientVideo from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ViewerClientVideo
      avatar={""}
      fullName={""}
      username={""}
      videoUrl={""}
      videoPosterUrl={""}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
