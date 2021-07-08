import { shallow } from "enzyme";
import { CelebrityFavoriteButton } from ".";

it.skip("should renders without crashing", () => {
  const wrapper = shallow(<CelebrityFavoriteButton />);
  expect(wrapper.exists()).toBeTruthy();
});
