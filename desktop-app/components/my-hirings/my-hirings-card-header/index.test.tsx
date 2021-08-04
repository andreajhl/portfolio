import { shallow } from "enzyme";
import { testMyHiringsContract } from "__test__/fake-data/testContract";
import { MyHiringsCardHeader } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <MyHiringsCardHeader contractData={testMyHiringsContract} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
