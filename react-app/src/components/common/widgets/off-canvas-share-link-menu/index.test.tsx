import { shallow } from "enzyme";
import { OffCanvasShareLinkMenu } from "./";

it("should renders without crashing", () => {
  const wrapper = shallow(<OffCanvasShareLinkMenu />);
  expect(wrapper.exists()).toBeTruthy();
});
