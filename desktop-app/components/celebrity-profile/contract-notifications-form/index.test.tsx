import SubmitButton from "desktop-app/components/common/button/submit-button";
import { BooleanRadiosInputs } from "desktop-app/components/common/form/boolean-checkboxes";
import { CellphoneNumberInput } from "desktop-app/components/common/form/cellphone-number-input";
import WarningMessage from "desktop-app/components/common/warning-message";
import { WizardTopNavigation } from "desktop-app/components/common/wizard-top-navigation";
import { ContractNotificationsType } from "desktop-app/types/contractDataType";
import { shallow } from "enzyme";
import ContractNotificationsForm from ".";

// PENDING
// it change its elements values when onChange is called

function shallowRenderContractNotificationsForm(overrideProps = {}) {
  const wrapper = shallow(
    <ContractNotificationsForm
      onSubmit={() => {}}
      onStepChange={() => {}}
      isLoading={false}
      {...overrideProps}
    />
  );

  const submitForm = wrapper.find(SubmitButton).invoke("onClick");

  const initialChangeWizardStep = wrapper
    .find(WizardTopNavigation)
    .prop("onStepClick");

  type ChangeWizardStepType = typeof initialChangeWizardStep;

  const changeWizardStep: ChangeWizardStepType = (...params) => {
    wrapper.find(WizardTopNavigation).invoke("onStepClick")(...params);
  };

  return { wrapper, changeWizardStep, submitForm };
}
it("renders without crashing", () => {
  const { wrapper } = shallowRenderContractNotificationsForm();
  expect(wrapper.exists()).toBeTruthy();
});

const initialValues: ContractNotificationsType = {
  deliveryContact: "",
  deliveryContactCellphone: "",
  isPublic: true,
};

it("renders deliveryContact input, <CellphoneNumberInput /> and <BooleanRadiosInputs />  with default values", () => {
  const { wrapper } = shallowRenderContractNotificationsForm();

  expect(
    wrapper.containsMatchingElement(
      <input name="deliveryContact" value={initialValues.deliveryContact} />
    )
  ).toBeTruthy();

  expect(
    wrapper.containsMatchingElement(
      <CellphoneNumberInput value={initialValues.deliveryContactCellphone} />
    )
  ).toBeTruthy();

  expect(
    wrapper.containsMatchingElement(
      <BooleanRadiosInputs value={initialValues.isPublic} />
    )
  ).toBeTruthy();
});

const useAuth = jest.spyOn(require("lib/famosos-auth"), "useAuth");

it("loads the user's email as deliveryContact field default value", () => {
  const testUser = { email: "user@testing.com" };
  useAuth.mockImplementationOnce(() => ({
    user: testUser,
  }));
  const { wrapper } = shallowRenderContractNotificationsForm();

  expect(
    wrapper.containsMatchingElement(
      <input name="deliveryContact" value={testUser.email} />
    )
  ).toBeTruthy();
});

it("not calls onSubmit prop when has not filled its inputs", () => {
  const onSubmit = jest.fn();
  const { wrapper, submitForm } = shallowRenderContractNotificationsForm({
    onSubmit,
  });

  submitForm(null);

  expect(onSubmit).not.toHaveBeenCalled();
  expect(wrapper.find(WarningMessage).first().prop("message")).toBeTruthy();
});

it("calls onStepChange prop when change to previous wizard step without field values", () => {
  const onStepChange = jest.fn();
  const { changeWizardStep } = shallowRenderContractNotificationsForm({
    onStepChange,
  });

  changeWizardStep(() => {}, true);

  expect(onStepChange).toHaveBeenCalledWith(null);
});

it("not  with an invalid form", () => {
  const onSubmit = jest.fn();
  const { changeWizardStep } = shallowRenderContractNotificationsForm({
    onSubmit,
  });

  changeWizardStep(() => {}, false);

  expect(onSubmit).not.toHaveBeenCalled();
});

const initialValuesFromProps = {
  deliveryContact: "testing@test.com",
  deliveryContactCellphone: "+57123412345",
  isPublic: false,
};

it("renders deliveryContact input, <CellphoneNumberInput /> and <BooleanRadiosInputs />  with values from initialValues prop", () => {
  const { wrapper } = shallowRenderContractNotificationsForm({
    initialValues: initialValuesFromProps,
  });

  expect(
    wrapper.containsMatchingElement(
      <input
        name="deliveryContact"
        value={initialValuesFromProps.deliveryContact}
      />
    )
  ).toBeTruthy();

  expect(
    wrapper.containsMatchingElement(
      <CellphoneNumberInput
        value={initialValuesFromProps.deliveryContactCellphone}
      />
    )
  ).toBeTruthy();

  expect(
    wrapper.containsMatchingElement(
      <BooleanRadiosInputs value={initialValuesFromProps.isPublic} />
    )
  ).toBeTruthy();
});

it("calls onSubmit prop when has filled at least deliveryContact", () => {
  const onSubmit = jest.fn();
  const testValues = {
    ...initialValuesFromProps,
    deliveryContactCellphone: "",
  };
  const { submitForm } = shallowRenderContractNotificationsForm({
    onSubmit,
    initialValues: testValues,
  });

  submitForm(null);

  expect(onSubmit).toHaveBeenCalledWith(testValues);
});

it("not calls onSubmit prop when  deliveryContactCellphone is invalid", () => {
  const onSubmit = jest.fn();
  const testValues = {
    ...initialValuesFromProps,
    deliveryContactCellphone: "Testing testing",
  };
  const { submitForm } = shallowRenderContractNotificationsForm({
    onSubmit,
    initialValues: testValues,
  });

  submitForm(null);

  expect(onSubmit).not.toHaveBeenCalled();
});

it("calls onStepChange prop when change to previous wizard step with field values", () => {
  const onStepChange = jest.fn();
  const { wrapper, changeWizardStep } = shallowRenderContractNotificationsForm({
    onStepChange,
    initialValues: initialValuesFromProps,
  });

  wrapper.find(`input[name="deliveryContact"]`).invoke("onFocus")({
    target: { name: "deliveryContact" },
  } as any);

  wrapper.find(CellphoneNumberInput).invoke("onChange")(
    initialValuesFromProps.deliveryContactCellphone,
    {},
    {} as any,
    ""
  );

  wrapper.find(BooleanRadiosInputs).invoke("onChange")(
    initialValuesFromProps.isPublic,
    {}
  );

  changeWizardStep(() => {}, true);

  expect(onStepChange).toHaveBeenCalledWith(initialValuesFromProps);
});

it("calls onSubmit prop when change to next wizard step calls onSubmit prop when change to next wizard step", () => {
  const onSubmit = jest.fn();
  const initialValues = {
    ...initialValuesFromProps,
    deliveryContact: "test@testing123.com",
  };
  const { wrapper, submitForm } = shallowRenderContractNotificationsForm({
    onSubmit,
    initialValues: initialValues,
  });

  wrapper.find(`input[name="deliveryContact"]`).invoke("onFocus")({
    target: { name: "deliveryContact" },
  } as any);

  wrapper.find(CellphoneNumberInput).invoke("onChange")(
    initialValues.deliveryContactCellphone,
    {},
    {} as any,
    ""
  );

  wrapper.find(BooleanRadiosInputs).invoke("onChange")(
    initialValues.isPublic,
    {}
  );

  submitForm(null);

  expect(onSubmit).toHaveBeenCalledWith(initialValues);
});
