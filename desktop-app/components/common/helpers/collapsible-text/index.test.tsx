import { shallow } from "enzyme";
import { CollapsibleText } from ".";

const testText = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse dignissimos vel fuga`;

it("should renders without crashing", () => {
  const wrapper = shallow(<CollapsibleText>{testText}</CollapsibleText>);
  expect(wrapper.exists()).toBeTruthy();
});
