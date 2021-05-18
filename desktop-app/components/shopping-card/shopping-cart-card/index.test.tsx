import { shallow } from "enzyme";
import { ShoppingCartCard } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<ShoppingCartCard />);
  expect(wrapper.exists()).toBeTruthy();
});
