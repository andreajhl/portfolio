import { shallow } from "enzyme";
import { CustomOffCanvas } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<CustomOffCanvas isOpen>Prueba</CustomOffCanvas>);
  expect(wrapper.exists()).toBeTruthy();
});
