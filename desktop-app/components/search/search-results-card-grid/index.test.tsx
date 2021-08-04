import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { SearchResultsCardGrid } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <SearchResultsCardGrid />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
