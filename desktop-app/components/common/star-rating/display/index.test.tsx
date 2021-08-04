import { shallow } from "enzyme";
import StarRatingDisplay from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<StarRatingDisplay />);
  expect(wrapper.exists()).toBeTruthy();
});
