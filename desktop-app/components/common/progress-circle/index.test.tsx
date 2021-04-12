import { shallow } from "enzyme";
import { ProgressCircle } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<ProgressCircle isDone />);
  expect(wrapper.exists()).toBeTruthy();
});
