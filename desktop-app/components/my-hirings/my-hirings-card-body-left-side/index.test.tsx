import { shallow } from "enzyme";
import { testMyHiringsContract } from "__test__/fake-data/testContract";
import { MyHiringsCardBodyLeftSide } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <MyHiringsCardBodyLeftSide contractData={testMyHiringsContract} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
