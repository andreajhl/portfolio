import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { CommentCreator } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <CommentCreator
        firstComment
        onCommentCreated={() => {}}
        contract_reference=""
      />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
