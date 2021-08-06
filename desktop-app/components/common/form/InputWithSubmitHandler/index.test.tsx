import { shallow } from "enzyme";
import InputWithSubmitHandler from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <InputWithSubmitHandler
      placeHolderInput={"Lorem ipsum"}
      placeHolderButton={"Click me"}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
