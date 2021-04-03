import { shallow } from "enzyme";
import { TextInputWithPlaceholders } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<TextInputWithPlaceholders value={"Hola"} />);
  expect(wrapper.exists()).toBeTruthy();
});
