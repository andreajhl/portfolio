import { shallow } from "enzyme";
import {
  testClientContract,
  testHiringConfiguration,
} from "__test__/fake-data/testContract";
import { LivePreviewCard } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <LivePreviewCard
      contract={testClientContract}
      configuration={testHiringConfiguration}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
