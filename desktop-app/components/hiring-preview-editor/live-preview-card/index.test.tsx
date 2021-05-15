import { shallow } from "enzyme";
import { LivePreviewCard } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<LivePreviewCard />);
  expect(wrapper.exists()).toBeTruthy();
});
