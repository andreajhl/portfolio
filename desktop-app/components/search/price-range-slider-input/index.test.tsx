import { shallow } from "enzyme";
import { PriceRangeSliderInput } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <PriceRangeSliderInput
      initialPrice={5}
      value={10}
      name="Input"
      label="Label"
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
