import { shallow } from "enzyme";
import { ContractCreated } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<ContractCreated contractReference="123-123-123" />);
  expect(wrapper.exists()).toBeTruthy();
});
