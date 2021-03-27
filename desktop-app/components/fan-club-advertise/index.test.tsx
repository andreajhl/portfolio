import { shallow } from "enzyme";
import testCelebrity from "__test__/testCelebrity";
import { FanClubAdvertise } from "./";

it("renders without crashing", () => {
  const wrapper = shallow(<FanClubAdvertise celebrity={testCelebrity} />);
  expect(wrapper.exists()).toBeTruthy();
});
