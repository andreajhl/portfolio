import { shallow } from "enzyme";
import { UserNotification } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <UserNotification
      notification={{
        date: "24/02/2021",
        description: "¡Tu video de Andrés Cepeda está listo!",
        action: "video_ready",
      }}
    ></UserNotification>
  );
  expect(wrapper.exists()).toBeTruthy();
});
