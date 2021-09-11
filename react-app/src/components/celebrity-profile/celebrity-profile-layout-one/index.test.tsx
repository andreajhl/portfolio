import { shallow } from "enzyme";
import { CelebrityProfileLayoutOne } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<CelebrityProfileLayoutOne />);
  expect(wrapper.exists()).toBeTruthy();
});
