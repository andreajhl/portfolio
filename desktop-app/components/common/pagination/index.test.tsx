import { shallow } from "enzyme";
import Pagination from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <Pagination totalPages={0} currentPage={0} onChangePage={() => {}} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
