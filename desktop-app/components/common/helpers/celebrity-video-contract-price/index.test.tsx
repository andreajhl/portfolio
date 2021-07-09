import { shallow } from "enzyme";
import testCelebrity from "__test__/fake-data/testCelebrity";
import { CelebrityVideoContractPrice } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <CelebrityVideoContractPrice celebrity={testCelebrity} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
