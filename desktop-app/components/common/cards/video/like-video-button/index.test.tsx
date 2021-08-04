import { shallow } from "enzyme";
import LikeVideoButton from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<LikeVideoButton onClick={() => {}} isLiked />);
  expect(wrapper.exists()).toBeTruthy();
});
