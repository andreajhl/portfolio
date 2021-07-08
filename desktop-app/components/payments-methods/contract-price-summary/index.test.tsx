import { shallow } from "enzyme";
import { ContractPriceSummary } from ".";

it.skip("renders without crashing", () => {
  const wrapper = shallow(<ContractPriceSummary />);
  expect(wrapper.exists()).toBeTruthy();
});
