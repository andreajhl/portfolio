import { shallow } from "enzyme";
import DLocalPaymentMethodForm from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <DLocalPaymentMethodForm expanded index={2} onToggle={() => {}} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
