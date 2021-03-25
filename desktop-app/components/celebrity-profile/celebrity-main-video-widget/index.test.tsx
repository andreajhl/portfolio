import { shallow } from "enzyme";
import testCelebrity from "__test__/testCelebrity";
import { CelebrityMainVideoWidget } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <CelebrityMainVideoWidget
      celebrity={testCelebrity}
      avatarProps={{ width: 200, height: 200 }}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
