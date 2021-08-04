import { shallow } from "enzyme";
import { UserNotificationsPopup } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<UserNotificationsPopup></UserNotificationsPopup>);
  expect(wrapper.exists()).toBeTruthy();
});
