import { shallow } from "enzyme";
import { ContractInfo } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<ContractInfo />);
  expect(wrapper.exists()).toBeTruthy();
});
