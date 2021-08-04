import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { SearchFilters } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <SearchFilters />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
