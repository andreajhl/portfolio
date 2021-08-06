import { shallow } from "enzyme";
import AvatarWithName from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<AvatarWithName src={""} imgAlt="" name="" />);
  expect(wrapper.exists()).toBeTruthy();
});
