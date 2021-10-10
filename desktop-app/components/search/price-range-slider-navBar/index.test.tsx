import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { PriceRangeSliderNavBar} from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <PriceRangeSliderNavBar />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
