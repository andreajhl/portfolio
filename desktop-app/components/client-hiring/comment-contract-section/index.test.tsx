import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { CommentContractSection } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <CommentContractSection contract_reference={""} />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
