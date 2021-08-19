import { shallow } from "enzyme";
import { MainVideoWidgetSlideshow } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<MainVideoWidgetSlideshow />);
  expect(wrapper.exists()).toBeTruthy();
});
