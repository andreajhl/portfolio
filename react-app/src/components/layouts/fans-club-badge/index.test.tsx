import { shallow } from "enzyme";
import { FanClubBadge } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<FanClubBadge />);
  expect(wrapper.exists()).toBeTruthy();
});