import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { PaymentsMethodsSelectorCard } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <PaymentsMethodsSelectorCard />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
