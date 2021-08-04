import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { CelebrityFavoriteButton } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <CelebrityFavoriteButton />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
