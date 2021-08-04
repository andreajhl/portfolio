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
      errors={{}}
      isLoading={false}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
