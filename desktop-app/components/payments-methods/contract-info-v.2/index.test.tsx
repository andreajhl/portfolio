import { shallow } from "enzyme";
import { ContractInfoV2 } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<ContractInfoV2 />);
  expect(wrapper.exists()).toBeTruthy();
});
