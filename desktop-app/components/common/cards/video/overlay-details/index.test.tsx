import { shallow } from "enzyme";
import OverlayDetailsProps from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<OverlayDetailsProps onLikevideo={() => {}} />);
  expect(wrapper.exists()).toBeTruthy();
});
