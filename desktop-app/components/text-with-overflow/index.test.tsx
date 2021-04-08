import { shallow } from "enzyme";
import { TextWithOverflow } from "./";

it("renders without crashing", () => {
  const wrapper = shallow(<TextWithOverflow text="prueba" />);
  expect(wrapper.exists()).toBeTruthy();
});
