import { shallow } from "enzyme";
import VideoDeliveryForm from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <VideoDeliveryForm celebrityFullName="" onSubmit={() => {}} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
