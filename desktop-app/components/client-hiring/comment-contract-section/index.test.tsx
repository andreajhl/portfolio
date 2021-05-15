import { shallow } from "enzyme";
import { CommentContract } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<CommentContract contract_reference={""} />);
  expect(wrapper.exists()).toBeTruthy();
});
