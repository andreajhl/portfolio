import { shallow } from "enzyme";
import { testMyHiringsContract } from "__test__/fake-data/testContract";
import { ContractReviewCard } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <ContractReviewCard contractData={testMyHiringsContract} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
