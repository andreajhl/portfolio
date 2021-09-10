import { shallow } from "enzyme";
import { CelebritySlideshowTwo } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<CelebritySlideshowTwo />);
  expect(wrapper.exists()).toBeTruthy();
});
