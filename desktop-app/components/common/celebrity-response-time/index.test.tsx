import { shallow } from "enzyme";
import { CelebrityResponseTime } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <CelebrityResponseTime
      turnAroundTime={0}
      availableForFlashDeliveries={false}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
