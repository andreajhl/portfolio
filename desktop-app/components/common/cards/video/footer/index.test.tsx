import { shallow } from "enzyme";
import VideoFooter from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <VideoFooter avatarURL="/" fullName="Lorem" userName="Loremp ipsum" />
  );
  expect(wrapper.exists()).toBeTruthy();
});
