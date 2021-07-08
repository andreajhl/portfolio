import { shallow } from "enzyme";
import { CommentContractSection } from ".";

it.skip("should renders without crashing", () => {
  const wrapper = shallow(<CommentContractSection contract_reference={""} />);
  expect(wrapper.exists()).toBeTruthy();
});
