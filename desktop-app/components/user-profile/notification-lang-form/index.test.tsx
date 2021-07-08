import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { NotificationLangForm } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <NotificationLangForm />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
