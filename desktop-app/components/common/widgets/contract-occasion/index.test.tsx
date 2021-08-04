import { shallow } from "enzyme";
import { ContractOccasion } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<ContractOccasion />);
  expect(wrapper.exists()).toBeTruthy();
});