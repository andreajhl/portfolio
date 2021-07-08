import { shallow } from "enzyme";
import testCelebrity from "__test__/fake-data/testCelebrity";
import { CelebrityDetails } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<CelebrityDetails celebrity={testCelebrity} />);
  expect(wrapper.exists()).toBeTruthy();
});
