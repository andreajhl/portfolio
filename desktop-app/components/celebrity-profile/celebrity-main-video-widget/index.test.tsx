import { shallow } from "enzyme";
import testCelebrity from "__test__/fake-data/testCelebrity";
import ReduxProvider from "__test__/ReduxProvider";
import { CelebrityMainVideoWidget } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <CelebrityMainVideoWidget
        celebrity={testCelebrity}
        avatarProps={{ width: 200, height: 200 }}
      />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
