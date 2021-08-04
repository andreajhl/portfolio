import { shallow } from "enzyme";
import { NewsletterPopupContentB } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<NewsletterPopupContentB />);
  expect(wrapper.exists()).toBeTruthy();
});
