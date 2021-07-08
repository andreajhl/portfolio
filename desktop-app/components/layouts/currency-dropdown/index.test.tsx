import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { CurrencyDropdown } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <CurrencyDropdown />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
