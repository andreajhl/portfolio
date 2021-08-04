import { shallow } from "enzyme";
import testCelebrity from "__test__/fake-data/testCelebrity";
import {
  testLastPayment,
  contractToPay,
} from "__test__/fake-data/testContract";
import ContractSummaryRejected from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ContractSummaryRejected
      contract={contractToPay}
      celebrity={testCelebrity}
      lastPayment={testLastPayment}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
