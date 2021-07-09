import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { VideoContractsFavorites } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <VideoContractsFavorites />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
