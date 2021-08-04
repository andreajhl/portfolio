import { shallow } from "enzyme";
import Maybe from ".";

it("renders its children if 'it' props is true", () => {
  const ifBlock = <span>IfBlock</span>;
  const wrapper = shallow(
    <div>
      <Maybe it={true}>{ifBlock}</Maybe>
    </div>
  );
  expect(wrapper.containsMatchingElement(ifBlock)).toBeTruthy();
});

it("not renders its children  if 'it' props is false", () => {
  const ifBlock = <span>IfBlock</span>;
  const wrapper = shallow(
    <div>
      <Maybe it={false}>{ifBlock}</Maybe>
    </div>
  );
  expect(wrapper.containsMatchingElement(ifBlock)).toBeFalsy();
  expect(wrapper.children()).toHaveLength(0);
});

it("renders orElse if 'it' props is false", () => {
  const ifBlock = <span>IfBlock</span>;
  const orElseBlock = <span>OrElseBlock</span>;
  const wrapper = shallow(
    <div>
      <Maybe it={false} orElse={orElseBlock}>
        {ifBlock}
      </Maybe>
    </div>
  );
  expect(wrapper.containsMatchingElement(orElseBlock)).toBeTruthy();
});

it("renders nested blocks", () => {
  const ifIfBlock = <span>If-IfBlock</span>;
  const wrapper = shallow(
    <div>
      <Maybe it={true}>
        <Maybe it={true}>{ifIfBlock}</Maybe>
      </Maybe>
    </div>
  );
  expect(wrapper.containsMatchingElement(ifIfBlock)).toBeTruthy();
});
