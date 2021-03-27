import { shallow } from "enzyme";
import Reel from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<Reel />);
  expect(wrapper.exists()).toBeTruthy();
});
