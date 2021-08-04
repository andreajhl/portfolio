import { shallow } from "enzyme";
import { testMyHiringsContract } from "__test__/fake-data/testContract";
import { MyHiringsCardDetails } from "./";

const testValues = {
  deliveryTo: "",
  deliveryFrom: "",
  instructions: "",
};

it("renders without crashing", () => {
  const wrapper = shallow(
    <MyHiringsCardDetails
      contractData={testMyHiringsContract}
      isEditing={false}
      setIsEditing={() => {}}
      values={testValues}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
