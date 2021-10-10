import { shallow } from "enzyme";
import { PriceRangeSliderInputNavBar } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <PriceRangeSliderInputNavBar
      initialPrice={5}
      value={'10'}
      name="Input"
      label="Label"
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
