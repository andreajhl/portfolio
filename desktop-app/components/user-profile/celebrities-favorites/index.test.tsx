import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { CelebritiesFavoritesEdit } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <CelebritiesFavoritesEdit />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
