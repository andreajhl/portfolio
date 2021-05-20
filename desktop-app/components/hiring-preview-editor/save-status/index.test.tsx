import { shallow } from "enzyme";
import { SaveStatus } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<SaveStatus />);
  expect(wrapper.exists()).toBeTruthy();
});
