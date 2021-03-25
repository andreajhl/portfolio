import { shallow } from "enzyme";
import { AnimatedPopup } from "./";

it("renders without crashing", () => {
  const wrapper = shallow(<AnimatedPopup>Prueba</AnimatedPopup>);
  expect(wrapper.exists()).toBeTruthy();
});
