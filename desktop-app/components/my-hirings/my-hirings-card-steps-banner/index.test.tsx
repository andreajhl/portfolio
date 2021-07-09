import { shallow } from "enzyme";
import { testMyHiringsContract } from "__test__/fake-data/testContract";
import { MyHiringsCardStepsBanner } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <MyHiringsCardStepsBanner contractData={testMyHiringsContract} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
