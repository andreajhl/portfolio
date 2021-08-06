import { shallow } from "enzyme";
import UpdatePasswordForm from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<UpdatePasswordForm />);
  expect(wrapper.exists()).toBeTruthy();
});
