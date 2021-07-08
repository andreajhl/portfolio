import { shallow } from "enzyme";
import { ContractDataForm } from ".";

it.skip("renders without crashing", () => {
  const wrapper = shallow(<ContractDataForm />);
  expect(wrapper.exists()).toBeTruthy();
});
