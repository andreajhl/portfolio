import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { DownloadReceiptLink } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <DownloadReceiptLink
        contractId={123}
        contractReference={"asd"}
        contractStatus={10}
      />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
