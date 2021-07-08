import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { CategoryFilter } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <CategoryFilter />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
