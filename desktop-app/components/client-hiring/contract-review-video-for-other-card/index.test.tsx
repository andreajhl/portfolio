import { shallow } from "enzyme";
import { ContractReviewVideo } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <ContractReviewVideo
      contract_reference="123-123"
      onDismissReview={() => {}}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
