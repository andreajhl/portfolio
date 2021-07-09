import { shallow } from "enzyme";
import { FansClubBadge } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<FansClubBadge />);
  expect(wrapper.exists()).toBeTruthy();
});
