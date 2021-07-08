import { shallow } from "enzyme";
import testCelebrity from "__test__/fake-data/testCelebrity";
import SimilarCelebritiesCardsReel from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <SimilarCelebritiesCardsReel
      celebrityUsername={testCelebrity.username}
      isLoading
      similarCelebrities={[]}
      fetchSimilarCelebrities={(celebrityUsername) => () => {}}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
