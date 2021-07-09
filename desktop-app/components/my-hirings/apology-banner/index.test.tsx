import { shallow } from "enzyme";
import { testMyHiringsContract } from "__test__/fake-data/testContract";
import { ApologyBanner } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <ApologyBanner contractData={testMyHiringsContract} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
