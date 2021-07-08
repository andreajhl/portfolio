import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { PriceRangeSlider } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <PriceRangeSlider />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
