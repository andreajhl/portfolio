import { shallow } from "enzyme";
import { NotificationLangForm } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<NotificationLangForm />);
  expect(wrapper.exists()).toBeTruthy();
});
