import { shallow } from "enzyme";
import { ContractPriceSummary } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<ContractPriceSummary />);
  expect(wrapper.exists()).toBeTruthy();
});