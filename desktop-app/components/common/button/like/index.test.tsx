import { shallow } from "enzyme";
import { LikeButton } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<LikeButton />);
  expect(wrapper.exists()).toBeTruthy();
});
