import { shallow } from "enzyme";
import ContractDeliveryForm from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ContractDeliveryForm
      videoMessagePrice={200}
      bussinessPrice={200}
      showBussinessPrice={true}
      celebrityFullName=""
      onSubmit={() => {}}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
