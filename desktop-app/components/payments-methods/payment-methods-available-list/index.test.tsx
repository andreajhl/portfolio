import { shallow } from "enzyme";
import PaymentMethodsAvailableList from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<PaymentMethodsAvailableList payment_methods={[]} />);
  expect(wrapper.exists()).toBeTruthy();
});
