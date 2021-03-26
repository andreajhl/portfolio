import { shallow } from "enzyme";
import testCelebrity from "__test__/testCelebrity";
import { DonorAlert } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <DonorAlert
      fullName={testCelebrity.fullName}
      causeName={testCelebrity.causeName}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
