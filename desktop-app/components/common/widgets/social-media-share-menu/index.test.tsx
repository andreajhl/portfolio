import { shallow } from "enzyme";
import { SocialMediaShareMenu } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<SocialMediaShareMenu />);
  expect(wrapper.exists()).toBeTruthy();
});
