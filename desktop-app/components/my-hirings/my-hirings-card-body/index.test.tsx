import { shallow } from "enzyme";
import { testMyHiringsContract } from "__test__/fake-data/testContract";
import { MyHiringsCardBody } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <MyHiringsCardBody contractData={testMyHiringsContract} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
