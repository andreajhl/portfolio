import { shallow } from "enzyme";
import { SearchResults } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<SearchResults />);
  expect(wrapper.exists()).toBeTruthy();
});