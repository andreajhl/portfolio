import { shallow } from "enzyme";
import ContractSummaryLayout from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ContractSummaryLayout
      header="Test header"
      contractDetails={undefined}
      instructions="Test instructions"
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
