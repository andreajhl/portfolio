import { shallow } from "enzyme";
import { testMyHiringsContract } from "__test__/fake-data/testContract";
import { MyHiringsCardBodyRightSide } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <MyHiringsCardBodyRightSide contractData={testMyHiringsContract} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
