import { shallow } from "enzyme";
import { SaveStatus } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<SaveStatus status="idle" />);
  expect(wrapper.exists()).toBeTruthy();
});
