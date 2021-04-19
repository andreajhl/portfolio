import { shallow } from "enzyme";
import { HashtagsFilter } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<HashtagsFilter />);
  expect(wrapper.exists()).toBeTruthy();
});