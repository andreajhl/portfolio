import { shallow } from "enzyme";
import { ContractDetailsForm } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<ContractDetailsForm />);
  expect(wrapper.exists()).toBeTruthy();
});