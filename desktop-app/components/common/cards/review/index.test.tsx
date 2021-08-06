import { shallow } from "enzyme";
import CardReview from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <CardReview
      contract_stars={5}
      user_full_name="Lorem"
      date="22/12/2018"
      contract_review="Lorem ipsum"
      showBox
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
