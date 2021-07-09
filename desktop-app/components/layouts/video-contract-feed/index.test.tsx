import { shallow } from "enzyme";
import { testClientContract } from "__test__/fake-data/testContract";
import { VideoContractFeed } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <VideoContractFeed contractData={testClientContract} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
