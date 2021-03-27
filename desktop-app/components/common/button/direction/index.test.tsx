import { shallow } from "enzyme";
import DirectionButton from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<DirectionButton />);
  expect(wrapper.exists()).toBeTruthy();
});
