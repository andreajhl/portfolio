import { shallow } from "enzyme";
import InputWithUpperLabel from "./";

it("renders without crashing", () => {
  const wrapper = shallow(
    <InputWithUpperLabel
      inputId="test"
      value="lorem"
      onChange={() => {}}
      placeholder=""
      label=""
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
