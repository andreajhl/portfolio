import { shallow } from "enzyme";
import { ContractInfoHeaderV2 } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<ContractInfoHeaderV2 />);
  expect(wrapper.exists()).toBeTruthy();
});
