import { shallow } from "enzyme";
import StripeForm from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <StripeForm expanded index={2} onToggle={() => {}} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
