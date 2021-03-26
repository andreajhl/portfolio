import { categories } from "constants/categories";
import { shallow } from "enzyme";
import { CategoryCard } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<CategoryCard category={categories[0]} />);
  expect(wrapper.exists()).toBeTruthy();
});
