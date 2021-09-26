import { shallow } from "enzyme";
import { OffCanvasShareReferralLinkMenu } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<OffCanvasShareReferralLinkMenu />);
  expect(wrapper.exists()).toBeTruthy();
});
