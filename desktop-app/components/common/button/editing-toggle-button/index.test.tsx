import { shallow } from "enzyme";
import { EditingToggleButton } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<EditingToggleButton />);
  expect(wrapper.exists()).toBeTruthy();
});