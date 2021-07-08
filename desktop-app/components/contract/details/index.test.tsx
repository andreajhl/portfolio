import { shallow } from "enzyme";
import testCelebrity from "__test__/fake-data/testCelebrity";
import { contractToPay } from "__test__/testContract";
import ContractDetails from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ContractDetails contract={contractToPay} celebrity={testCelebrity} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
