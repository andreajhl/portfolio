import { shallow } from "enzyme";
import useForm from "lib/hooks/useForm";

function FakeComponent() {
  const onSubmit = jest.fn();
  const form = useForm({ initialValues: { test: "" }, onSubmit });
  return <span>{JSON.stringify(form)}</span>;
}

it("should return the initial state", () => {
  const wrapper = shallow(<FakeComponent />);
  expect(wrapper.debug()).toMatchSnapshot();
});
