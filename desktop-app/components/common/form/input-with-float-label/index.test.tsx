import { shallow } from "enzyme";
import InputWithFloatLabel from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <InputWithFloatLabel
      placeholder="Lorem"
      onChangeValue={() => {}}
      value={"Lorem"}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
