import { shallow } from "enzyme";
import { testMyHiringsContract } from "__test__/fake-data/testContract";
import { MyHiringsCardNotificationInfo } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <MyHiringsCardNotificationInfo
      contractData={testMyHiringsContract}
      isEditing={false}
      values={{
        deliveryContact: "",
        deliveryContactCellphone: "",
      }}
      errors={{}}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
