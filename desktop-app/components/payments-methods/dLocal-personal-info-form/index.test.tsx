import WarningMessage from "desktop-app/components/common/warning-message";
import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import DLocalPersonalInfoForm, {
  DLocalPersonalInfoForm as ConnectedDLocalPersonalInfoForm,
} from ".";

// PENDING
// it renders identification_document input placeholder properly.

const testCurrency = "COP";
const testDispatch: any = () => {};

function shallowRenderDLocalPersonalInfoForm(overrideProps = {}) {
  const wrapper = shallow(
    <DLocalPersonalInfoForm
      onChangeValues={() => {}}
      errorMessage={null}
      currency={testCurrency}
      currencyExchangeData={{ to: testCurrency }}
      dispatch={testDispatch}
      {...overrideProps}
    />
  );

  function changeInputValue(inputName: string, value: string) {
    wrapper.find(`input[name="${inputName}"]`).invoke("onChange")({
      target: { name: inputName, value },
    } as any);
  }

  return { wrapper, changeInputValue };
}

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <ConnectedDLocalPersonalInfoForm
        onChangeValues={() => {}}
        errorMessage={null}
        currency={testCurrency}
      />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});

const initialValues = {
  buyer_name: "",
  email_address: "",
  identification_document: "",
};

it("calls onChangeValues prop with initial values", () => {
  const onChangeValues = jest.fn();
  shallowRenderDLocalPersonalInfoForm({ onChangeValues });

  expect(onChangeValues).toHaveBeenCalledWith(initialValues);
});

const initialValuesFromProps = {
  buyer_name: "Test Doe",
  email_address: "testing@test.com",
  identification_document: "20202020",
};

it("calls onChangeValues prop with initial values from props", () => {
  const onChangeValues = jest.fn();
  shallowRenderDLocalPersonalInfoForm({
    onChangeValues,
    initialValues: initialValuesFromProps,
  });

  expect(onChangeValues).toHaveBeenCalledWith(initialValuesFromProps);
});

it("it renders a <WarningMessage /> with errorMessage from props", () => {
  const testErrorMessage = "This is a testing error message";
  const { wrapper } = shallowRenderDLocalPersonalInfoForm({
    errorMessage: testErrorMessage,
  });

  expect(
    wrapper.containsMatchingElement(
      <WarningMessage message={testErrorMessage} />
    )
  ).toBeTruthy();
});

it("renders its inputs properly", () => {
  const testInitialValues = {
    buyer_name: "this is a valid name",
    email_address: "thisisavalid@email.com",
    identification_document: "20202020",
  };
  const onChangeValues = jest.fn();
  const { wrapper, changeInputValue } = shallowRenderDLocalPersonalInfoForm({
    initialValues: testInitialValues,
    onChangeValues,
  });

  function testInput([name, value]: [string, string]): void {
    // renders ${name} input without errors
    expect(
      wrapper.containsMatchingElement(<input name={name} value={value} />)
    ).toBeTruthy();
    expect(
      wrapper.find(`input[name="${name}"] + WarningMessage`).prop("message")
    ).toBeFalsy();

    changeInputValue(name, "");

    // renders ${name} input error when is empty
    expect(
      wrapper.containsMatchingElement(<input name={name} value="" />)
    ).toBeTruthy();
    expect(
      wrapper.find(`input[name="${name}"] + WarningMessage`).prop("message")
    ).toBeTruthy();
  }

  Object.entries(testInitialValues).forEach(testInput);

  // renders an error when document value is invalid
  const documentInputName = "identification_document";
  const invalidDocumentValue = "test test test";
  changeInputValue(documentInputName, invalidDocumentValue);

  expect(
    wrapper
      .find(`input[name="${documentInputName}"] + WarningMessage`)
      .prop("message")
  ).toBeTruthy();

  // calls onChangeValues as expected
  expect(onChangeValues).toHaveBeenCalledTimes(5);
});
