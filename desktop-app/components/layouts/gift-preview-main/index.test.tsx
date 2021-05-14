import { shallow } from "enzyme";
import { GiftPreviewMain } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<GiftPreviewMain />);
  expect(wrapper.exists()).toBeTruthy();
});
