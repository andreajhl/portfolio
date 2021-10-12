import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { CategorieFilterCarrousel } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <CategorieFilterCarrousel itemWidth={187} itemHeight={67} gap={20} />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
