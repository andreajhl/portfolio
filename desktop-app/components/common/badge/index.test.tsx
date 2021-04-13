import { shallow } from "enzyme";
import Badge from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<Badge text="Lorem" />);
  expect(wrapper.exists()).toBeTruthy();
});
