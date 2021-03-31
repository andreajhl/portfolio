import { shallow } from "enzyme";
import VideoNotificationForm from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<VideoNotificationForm />);
  expect(wrapper.exists()).toBeTruthy();
});
