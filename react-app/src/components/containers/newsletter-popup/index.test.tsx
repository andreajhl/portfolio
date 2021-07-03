import { shallow } from "enzyme";
import { NewsletterPopup } from "./";

it("should renders without crashing", () => {
  const wrapper = shallow(<NewsletterPopup />);
  expect(wrapper.exists()).toBeTruthy();
});