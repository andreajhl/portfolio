import { shallow } from "enzyme";
import { CelebrityInfoReviews } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<CelebrityInfoReviews celebrityStarsAverage={5} />);
  expect(wrapper.exists()).toBeTruthy();
});
