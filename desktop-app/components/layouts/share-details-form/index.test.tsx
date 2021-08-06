import { shallow } from "enzyme";
import { testClientContract } from "__test__/fake-data/testContract";
import { ShareDetailsForm } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <ShareDetailsForm contractData={testClientContract} status="idle" />
  );
  expect(wrapper.exists()).toBeTruthy();
});
