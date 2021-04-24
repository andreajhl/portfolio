import { shallow } from "enzyme";
import { ContractInstructionsTextarea } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<ContractInstructionsTextarea />);
  expect(wrapper.exists()).toBeTruthy();
});
