import { shallow } from "enzyme";
import UpdateUserGender from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<UpdateUserGender gener="male" />);
  expect(wrapper.exists()).toBeTruthy();
});
