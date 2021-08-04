import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { CurrencyModal } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <CurrencyModal />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
