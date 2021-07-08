import { shallow } from "enzyme";
import ContractSummaryRejected from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ContractSummaryRejected
      contract={undefined}
      celebrity={undefined}
      lastPayment={undefined}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
