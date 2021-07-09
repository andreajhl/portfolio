import { shallow } from "enzyme";
import { testClientContract } from "__test__/fake-data/testContract";
import { ClientHiringForOther } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <ClientHiringForOther contractData={testClientContract} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
