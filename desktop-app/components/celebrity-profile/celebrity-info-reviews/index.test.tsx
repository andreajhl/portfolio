import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { CelebrityInfoReviews } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <CelebrityInfoReviews celebrityStarsAverage={5} />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
