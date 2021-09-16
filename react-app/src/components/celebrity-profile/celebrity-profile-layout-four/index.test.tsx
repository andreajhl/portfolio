import { shallow } from "enzyme";
import { CelebrityProfileLayoutFour } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<CelebrityProfileLayoutFour />);
  expect(wrapper.exists()).toBeTruthy();
});
