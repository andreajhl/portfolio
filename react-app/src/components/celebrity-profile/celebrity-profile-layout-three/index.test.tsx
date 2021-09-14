import { shallow } from "enzyme";
import { CelebrityProfileLayoutThree } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<CelebrityProfileLayoutThree />);
  expect(wrapper.exists()).toBeTruthy();
});
