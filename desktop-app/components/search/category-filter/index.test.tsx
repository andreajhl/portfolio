import { shallow } from "enzyme";
import { CategoryFilter } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<CategoryFilter />);
  expect(wrapper.exists()).toBeTruthy();
});
