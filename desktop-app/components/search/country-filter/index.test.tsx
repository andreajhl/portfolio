import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { CountryFilter } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <CountryFilter />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
