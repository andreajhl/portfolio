import { shallow } from "enzyme";
import VideoDeliveryFormFieldsElements from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <VideoDeliveryFormFieldsElements
      deliveryTo=""
      deliveryFrom=""
      onChange={() => {}}
      contractType={2}
      onSubmit={() => {}}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
