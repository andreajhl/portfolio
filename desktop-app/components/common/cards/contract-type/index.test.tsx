import { shallow } from "enzyme";
import ContractTypeCards from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<ContractTypeCards onChangeType={() => {}} />);
  expect(wrapper.exists()).toBeTruthy();
});
