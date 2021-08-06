import { shallow } from "enzyme";
import { ContractDataFormInput } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<ContractDataFormInput />);
  expect(wrapper.exists()).toBeTruthy();
});
