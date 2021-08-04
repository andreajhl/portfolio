import { shallow } from "enzyme";
import CommentsContractVideo from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<CommentsContractVideo contractComments={[]} />);
  expect(wrapper.exists()).toBeTruthy();
});
