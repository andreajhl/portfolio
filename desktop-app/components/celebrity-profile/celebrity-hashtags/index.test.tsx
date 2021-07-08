import { shallow } from "enzyme";
import testCelebrity from "__test__/fake-data/testCelebrity";
import { CelebrityHashtags } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <CelebrityHashtags hashtags={testCelebrity.hashtags} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
