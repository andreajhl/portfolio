import { shallow } from "enzyme";
import { PriceRangeSlider } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<PriceRangeSlider />);
  expect(wrapper.exists()).toBeTruthy();
});