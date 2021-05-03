import { shallow } from "enzyme";
import { UserAvatarUploader } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<UserAvatarUploader />);
  expect(wrapper.exists()).toBeTruthy();
});