import { shallow } from "enzyme";
import { testMyHiringsContract } from "__test__/fake-data/testContract";
import { ShoppingCartCard } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <ShoppingCartCard contractData={testMyHiringsContract} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
