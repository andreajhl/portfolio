import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { ContractDataForm } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <ContractDataForm />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
