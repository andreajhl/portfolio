import { shallow } from "enzyme";
import PaypalForm from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <PaypalForm expanded index={2} onToggle={() => {}} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
