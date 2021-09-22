import { shallow } from "enzyme";
import { ReferralsInviteSlideshow } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<ReferralsInviteSlideshow />);
  expect(wrapper.exists()).toBeTruthy();
});
