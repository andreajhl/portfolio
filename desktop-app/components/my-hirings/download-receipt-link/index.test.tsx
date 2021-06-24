import { shallow } from "enzyme";
import { DownloadReceiptLink } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <DownloadReceiptLink
      contractId={123}
      contractReference={"asd"}
      contractStatus={10}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
