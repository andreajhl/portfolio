import { shallow } from "enzyme";
import { ContractInfoHeader } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<ContractInfoHeader />);
  expect(wrapper.exists()).toBeTruthy();
});
