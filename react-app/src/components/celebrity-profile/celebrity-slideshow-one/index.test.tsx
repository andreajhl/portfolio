import { shallow } from "enzyme";
import { CelebritySlideshowOne } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<CelebritySlideshowOne />);
  expect(wrapper.exists()).toBeTruthy();
});
