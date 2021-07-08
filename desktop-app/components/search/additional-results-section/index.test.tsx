import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { AdditionalResultsSection } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <AdditionalResultsSection />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
