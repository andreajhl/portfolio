import { shallow } from "enzyme";
import testCelebrity from "__test__/fake-data/testCelebrity";
import { ShareCelebrityDropdown } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<ShareCelebrityDropdown celebrity={testCelebrity} />);
  expect(wrapper.exists()).toBeTruthy();
});
