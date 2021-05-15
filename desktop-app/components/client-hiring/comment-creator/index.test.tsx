import { shallow } from "enzyme";
import { CommentCreator } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <CommentCreator
      firstComment
      onCommentCreated={() => {}}
      contract_reference=""
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
