import { shallow } from "enzyme";
import { AvatarUploaderModal } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<AvatarUploaderModal />);
  expect(wrapper.exists()).toBeTruthy();
});