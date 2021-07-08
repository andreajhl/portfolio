import { shallow } from "enzyme";
import { NewsletterPopupCompleted } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<NewsletterPopupCompleted closeModal={() => {}} />);
  expect(wrapper.exists()).toBeTruthy();
});
