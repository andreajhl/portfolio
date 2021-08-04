import { shallow } from "enzyme";
import UpdateUserEmail from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<UpdateUserEmail email="" />);
  expect(wrapper.exists()).toBeTruthy();
});
