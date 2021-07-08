import { shallow } from "enzyme";
import { HashtagsFilter } from ".";

it.skip("renders without crashing", () => {
  const wrapper = shallow(<HashtagsFilter />);
  expect(wrapper.exists()).toBeTruthy();
});
