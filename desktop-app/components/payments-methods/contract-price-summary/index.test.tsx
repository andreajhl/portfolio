import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { ContractPriceSummary } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <ContractPriceSummary />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
