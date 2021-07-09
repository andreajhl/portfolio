import { shallow } from "enzyme";
import { testMyHiringsContract } from "__test__/fake-data/testContract";
import { MyHiringsCardContractInfo } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <MyHiringsCardContractInfo contractData={testMyHiringsContract} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
