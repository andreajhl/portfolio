import { shallow } from "enzyme";
import testCelebrity from "__test__/fake-data/testCelebrity";
import {
  contractToPay,
  testLastPayment,
} from "__test__/fake-data/testContract";
import InstructionsContractApproved from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <InstructionsContractApproved
      contract={contractToPay}
      celebrity={testCelebrity}
      lastPayment={testLastPayment}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
