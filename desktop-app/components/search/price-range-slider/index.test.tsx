import { shallow } from "enzyme";
import { PriceRangeSlider } from ".";

it.skip("renders without crashing", () => {
  const wrapper = shallow(<PriceRangeSlider />);
  expect(wrapper.exists()).toBeTruthy();
});
