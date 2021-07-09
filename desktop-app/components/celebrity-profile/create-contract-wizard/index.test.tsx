import { shallow } from "enzyme";
import testCelebrity from "__test__/fake-data/testCelebrity";
import { CreateContractWizard } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<CreateContractWizard celebrity={testCelebrity} />);
  expect(wrapper.exists()).toBeTruthy();
});
