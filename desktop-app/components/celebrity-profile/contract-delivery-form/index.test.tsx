import { shallow } from "enzyme";
import testCelebrity from "__test__/fake-data/testCelebrity";
import ContractDeliveryForm from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ContractDeliveryForm
      celebrity={testCelebrity}
      isLoading={false}
      onSubmit={() => {}}
      onStepChange={() => {}}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
