import { shallow } from "enzyme";
import { FadeOut } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<FadeOut />);
  expect(wrapper.exists()).toBeTruthy();
});
