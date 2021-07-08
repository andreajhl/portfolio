import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { ContractCreated } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <ContractCreated contractReference="123-123-123" />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
