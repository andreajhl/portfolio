import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { SearchResults } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <SearchResults />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
