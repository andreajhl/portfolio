import { shallow } from "enzyme";
import { CollapsibleErrorMessage } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<CollapsibleErrorMessage />);
  expect(wrapper.exists()).toBeTruthy();
});
