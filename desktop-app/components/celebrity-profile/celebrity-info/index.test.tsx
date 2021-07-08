import { shallow } from "enzyme";
import testCelebrity from "__test__/fake-data/testCelebrity";
import { CelebrityInfo } from "./";

it("renders without crashing", () => {
  const wrapper = shallow(<CelebrityInfo celebrity={testCelebrity} />);
  expect(wrapper.exists()).toBeTruthy();
});
