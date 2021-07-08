import { shallow } from "enzyme";
import { SearchFilters } from ".";

it.skip("renders without crashing", () => {
  const wrapper = shallow(<SearchFilters />);
  expect(wrapper.exists()).toBeTruthy();
});
