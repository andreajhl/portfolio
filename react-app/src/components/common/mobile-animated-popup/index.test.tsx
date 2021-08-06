import { shallow } from "enzyme";
import { MobileAnimatedPopup } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <MobileAnimatedPopup trigger={<></>}>Prueba</MobileAnimatedPopup>
  );
  expect(wrapper.exists()).toBeTruthy();
});
