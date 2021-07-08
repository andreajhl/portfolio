import { shallow } from "enzyme";
import testCelebrity from "__test__/fake-data/testCelebrity";
import { contractToPay } from "__test__/testContract";
import InstructionsContractApproved from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <InstructionsContractApproved
      contract={contractToPay}
      celebrity={testCelebrity}
      lastPayment={undefined}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
