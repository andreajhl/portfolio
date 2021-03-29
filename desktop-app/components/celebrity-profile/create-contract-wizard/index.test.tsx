import { shallow } from "enzyme";
import { CreateContractWizard } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<CreateContractWizard />);
  expect(wrapper.exists()).toBeTruthy();
});