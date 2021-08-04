import { shallow } from "enzyme";
import { RangeSlider } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<RangeSlider />);
  expect(wrapper.exists()).toBeTruthy();
});