import { shallow } from "enzyme";
import { HashtagsBadgeList } from ".";

const testHashtags = [];

it("should renders without crashing", () => {
  const wrapper = shallow(<HashtagsBadgeList hashtags={testHashtags} />);
  expect(wrapper.exists()).toBeTruthy();
});
