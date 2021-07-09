import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { ShoppingCartList } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <ShoppingCartList />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
