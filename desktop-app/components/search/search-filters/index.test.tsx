import { shallow } from "enzyme";
import { SearchFilters } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<SearchFilters />);
  expect(wrapper.exists()).toBeTruthy();
});