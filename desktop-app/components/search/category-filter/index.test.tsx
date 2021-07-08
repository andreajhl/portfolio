import { shallow } from "enzyme";
import { CategoryFilter } from ".";

it.skip("renders without crashing", () => {
  const wrapper = shallow(<CategoryFilter />);
  expect(wrapper.exists()).toBeTruthy();
});
