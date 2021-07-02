import { shallow } from "enzyme";
import { NewsletterPopupContentA } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<NewsletterPopupContentA />);
  expect(wrapper.exists()).toBeTruthy();
});