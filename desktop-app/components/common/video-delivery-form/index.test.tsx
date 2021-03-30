import { shallow } from "enzyme";
import VideoDeliveryForm from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <VideoDeliveryForm
      videoMessagePrice={200}
      bussinessPrice={200}
      showBussinessPrice={true}
      celebrityFullName=""
      onSubmit={() => {}}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
