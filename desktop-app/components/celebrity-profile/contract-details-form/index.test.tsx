import { getOccasionMessage } from "constants/occasions";
import SubmitButton from "desktop-app/components/common/button/submit-button";
import { TextInputWithPlaceholders } from "desktop-app/components/common/form/text-input-with-placeholders";
import WarningMessage from "desktop-app/components/common/warning-message";
import { WizardTopNavigation } from "desktop-app/components/common/wizard-top-navigation";
import { ContractDetailsType } from "desktop-app/types/contractDataType";
import { shallow } from "enzyme";
import testCelebrity from "__test__/fake-data/testCelebrity";
import { ContractDetailsForm } from ".";
import { OccasionsGrid } from "../occasions-grid";

// PENDING
// it validates instructions. (not edited).

const initialContractType = 1;
const initialDeliveryTo = "testing testing";

function shallowRenderContractDetailsForm(overrideProps = {}) {
  const wrapper = shallow(
    <ContractDetailsForm
      celebrityFullName={testCelebrity.fullName}
      deliveryTo={initialDeliveryTo}
      contractType={initialContractType}
      isLoading={false}
      onSubmit={() => {}}
      onStepChange={() => {}}
      {...overrideProps}
    />
  );

  const submitForm = wrapper.find(SubmitButton).invoke("onClick");

  const initialChangeOccasion = wrapper
    .find(OccasionsGrid)
    .prop("onClickOccasion");
  type ChangeOccasionType = typeof initialChangeOccasion;
  const changeOccasion: ChangeOccasionType = (...params) => {
    wrapper.find(OccasionsGrid).prop("onClickOccasion")(...params);
  };

  const initialChangeWizardStep = wrapper
    .find(WizardTopNavigation)
    .prop("onStepClick");

  type ChangeWizardStepType = typeof initialChangeWizardStep;

  const changeWizardStep: ChangeWizardStepType = (...params) => {
    wrapper.find(WizardTopNavigation).invoke("onStepClick")(...params);
  };

  return {
    wrapper,
    changeOccasion,
    submitForm,
    changeWizardStep,
  };
}

it("renders without crashing", () => {
  const { wrapper } = shallowRenderContractDetailsForm();
  expect(wrapper.exists()).toBeTruthy();
});

const initialValues: ContractDetailsType = {
  occasion: "OTHER",
  instructions: "",
};

function replacePlaceHolder(text: string) {
  if (!text) return text;
  return text
    .replace(/PLACEHOLDER_FAMOSO_NAME/g, testCelebrity.fullName || "Famoso")
    .replace(/PLACEHOLDER_PARA/g, initialDeliveryTo || "[PARA]");
}

const getTextAreaValue: typeof getOccasionMessage = (
  locale,
  occasion,
  contractType
) => replacePlaceHolder(getOccasionMessage(locale, occasion, contractType));

it("renders <OccasionsGrid /> and <TextInputWithPlaceholders /> with default values when no initialValues as passed as props", () => {
  const { wrapper } = shallowRenderContractDetailsForm();

  expect(wrapper.find(OccasionsGrid).props()).toEqual(
    expect.objectContaining({
      contractType: initialContractType,
      selectedOccasion: initialValues.occasion,
    })
  );

  expect(
    wrapper.containsMatchingElement(
      <TextInputWithPlaceholders
        maxLength={300}
        value={getTextAreaValue(
          "en",
          initialValues.occasion,
          initialContractType
        )}
      />
    )
  ).toBeTruthy();
});

it("not change the <TextInputWithPlaceholders /> value when is already edited", () => {
  const { wrapper, changeOccasion } = shallowRenderContractDetailsForm();

  wrapper.find(TextInputWithPlaceholders).prop("onKeyUp")({
    key: "a",
  } as any);

  const newOccasion = "BIRTHDAY";
  changeOccasion(newOccasion);
  const newValue = getTextAreaValue("en", newOccasion, initialContractType);
  expect(
    wrapper.containsMatchingElement(
      <TextInputWithPlaceholders value={newValue} />
    )
  ).toBeFalsy();
});

it("change the <TextInputWithPlaceholders /> value  when change the occasion and is not edited", () => {
  const { wrapper, changeOccasion } = shallowRenderContractDetailsForm();
  const newOccasion = "BIRTHDAY";
  changeOccasion(newOccasion);
  const newValue = getTextAreaValue("en", newOccasion, initialContractType);
  expect(
    wrapper.containsMatchingElement(
      <TextInputWithPlaceholders value={newValue} />
    )
  ).toBeTruthy();
});

it("not calls onSubmit prop when has not form filled", () => {
  const onSubmit = jest.fn();
  const { wrapper, submitForm } = shallowRenderContractDetailsForm({
    onSubmit,
  });

  submitForm(null);
  expect(onSubmit).not.toBeCalled();
  expect(wrapper.find(WarningMessage).prop("message")).toBeTruthy();
});

it("not calls onSubmit prop when change to next wizard step with an invalid form", () => {
  const onSubmit = jest.fn();
  const { changeWizardStep } = shallowRenderContractDetailsForm({
    onSubmit,
  });

  changeWizardStep(() => {}, false);
  expect(onSubmit).not.toHaveBeenCalled();
});

const initialValuesFromProps: ContractDetailsType = {
  occasion: "BIRTHDAY",
  instructions: "Hi there! Testing is having a birthday today",
};

it("calls onStepChange prop when change to previous wizard step with touched field values", () => {
  const onStepChange = jest.fn();
  const {
    wrapper,
    changeWizardStep,
    changeOccasion,
  } = shallowRenderContractDetailsForm({
    onStepChange,
    initialValues: initialValuesFromProps,
  });

  wrapper.find(TextInputWithPlaceholders).prop("onKeyUp")({
    key: "a",
  } as any);
  changeOccasion(initialValuesFromProps.occasion);

  changeWizardStep(() => {}, true);
  expect(onStepChange).toHaveBeenCalledWith(initialValuesFromProps);
});

const veryLargeText =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore cumque, illo quod accusantium ut excepturi alias ex nulla animi possimus porro dolor atque, corporis vero dignissimos, quam tempora libero saepe iusto nisi tenetur numquam aperiam? Maxime, ex. Recusandae, laudantium sunt. reprehenderit cum ab laborum doloribus repudiandae!";

it("not calls onSubmit prop when instructions has length greater than 300", () => {
  const onSubmit = jest.fn();
  const { wrapper, submitForm } = shallowRenderContractDetailsForm({
    onSubmit,
    initialValues: { ...initialValuesFromProps, instructions: veryLargeText },
  });

  submitForm(null);
  expect(onSubmit).not.toBeCalled();
  expect(wrapper.find(WarningMessage).prop("message")).toBeTruthy();
});

const textWithPlaceholders = "Hi there! My name is [Name]";

it("not calls onSubmit prop when instructions has placeholders", () => {
  const onSubmit = jest.fn();
  const { wrapper, submitForm } = shallowRenderContractDetailsForm({
    onSubmit,
    initialValues: {
      ...initialValuesFromProps,
      instructions: textWithPlaceholders,
    },
  });

  submitForm(null);
  expect(onSubmit).not.toBeCalled();
  expect(wrapper.find(WarningMessage).prop("message")).toBeTruthy();
});

it("calls onSubmit prop when change to next wizard step", () => {
  const onSubmit = jest.fn();
  const { changeWizardStep } = shallowRenderContractDetailsForm({
    onSubmit,
    initialValues: initialValuesFromProps,
  });

  changeWizardStep(() => {}, false);
  expect(onSubmit).toHaveBeenCalledWith(initialValuesFromProps);
});

it("renders <OccasionsGrid /> and <TextInputWithPlaceholders /> with initialValues from props", () => {
  const { wrapper } = shallowRenderContractDetailsForm({
    initialValues: initialValuesFromProps,
  });

  expect(wrapper.find(OccasionsGrid).prop("selectedOccasion")).toEqual(
    initialValuesFromProps.occasion
  );

  expect(
    wrapper.containsMatchingElement(
      <TextInputWithPlaceholders value={initialValuesFromProps.instructions} />
    )
  ).toBeTruthy();
});

it("calls onSubmit prop when has form filled with initial values", () => {
  const onSubmit = jest.fn();
  const { submitForm } = shallowRenderContractDetailsForm({
    onSubmit,
    initialValues: initialValuesFromProps,
  });

  submitForm(null);
  expect(onSubmit).toBeCalledWith(initialValuesFromProps);
});
