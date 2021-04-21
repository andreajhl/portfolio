import { shallow } from "enzyme";
import { ContractDataForm } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<ContractDataForm />);
  expect(wrapper.exists()).toBeTruthy();
});