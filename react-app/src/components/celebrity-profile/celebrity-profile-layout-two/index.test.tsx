import { shallow } from "enzyme";
import { CelebrityProfileLayoutTwo } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<CelebrityProfileLayoutTwo />);
  expect(wrapper.exists()).toBeTruthy();
});
