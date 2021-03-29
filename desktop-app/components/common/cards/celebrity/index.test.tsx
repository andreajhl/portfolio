import { shallow } from "enzyme";
import testCelebrity from "__test__/testCelebrity";
import { CelebrityCard } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<CelebrityCard celebrity={testCelebrity} />);
  expect(wrapper.exists()).toBeTruthy();
});
