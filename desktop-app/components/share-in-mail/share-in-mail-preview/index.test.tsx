import { shallow } from "enzyme";
import { ShareInMailPreview } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<ShareInMailPreview />);
  expect(wrapper.exists()).toBeTruthy();
});
