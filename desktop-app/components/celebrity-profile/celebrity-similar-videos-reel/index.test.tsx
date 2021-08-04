import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { CelebritySimilarVideosReel } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <CelebritySimilarVideosReel />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
