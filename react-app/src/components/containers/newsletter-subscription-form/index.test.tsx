import { shallow } from "enzyme";
import { NewsletterSubscriptionForm } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<NewsletterSubscriptionForm />);
  expect(wrapper.exists()).toBeTruthy();
});
