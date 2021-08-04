import { shallow } from "enzyme";
import testCelebrity from "__test__/fake-data/testCelebrity";
import ReduxProvider from "__test__/ReduxProvider";
import { CelebrityCard } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <CelebrityCard celebrity={testCelebrity} />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
