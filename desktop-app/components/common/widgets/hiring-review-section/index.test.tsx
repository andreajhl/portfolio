import { shallow } from "enzyme";
import { testClientContract } from "__test__/fake-data/testContract";
import { HiringReviewSection } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <HiringReviewSection contractData={testClientContract} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
