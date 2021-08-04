import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { HashtagsFilter } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <HashtagsFilter />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
