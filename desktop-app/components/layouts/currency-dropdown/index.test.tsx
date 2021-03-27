import { shallow } from "enzyme";
import { CurrencyDropdown } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<CurrencyDropdown />);
  expect(wrapper.exists()).toBeTruthy();
});
