import { shallow } from "enzyme";
import { HashtagsBadgeList } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<HashtagsBadgeList />);
  expect(wrapper.exists()).toBeTruthy();
});
