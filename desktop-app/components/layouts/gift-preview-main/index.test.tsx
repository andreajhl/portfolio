import { shallow } from "enzyme";
import { testClientContract } from "__test__/fake-data/testContract";
import { GiftPreviewMain } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<GiftPreviewMain contract={testClientContract} />);
  expect(wrapper.exists()).toBeTruthy();
});
