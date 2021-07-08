import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { MyHiringsCardsSection } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <MyHiringsCardsSection />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
