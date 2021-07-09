import { shallow } from "enzyme";
import testCelebrity from "__test__/fake-data/testCelebrity";
import { CelebrityBusinessPrice } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<CelebrityBusinessPrice celebrity={testCelebrity} />);
  expect(wrapper.exists()).toBeTruthy();
});
