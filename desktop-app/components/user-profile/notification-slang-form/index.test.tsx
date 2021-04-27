import { shallow } from "enzyme";
import { NotificationSlangForm } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<NotificationSlangForm />);
  expect(wrapper.exists()).toBeTruthy();
});
