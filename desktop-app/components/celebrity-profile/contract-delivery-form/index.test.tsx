import ContractTypeCards from "desktop-app/components/common/cards/contract-type";
import { CelebrityVideoContractPrice } from "desktop-app/components/common/helpers/celebrity-video-contract-price";
import VideoDeliveryFormFieldsElements from "desktop-app/components/common/video-delivery-form-fields-elements";
import WhatsappAdForContracts from "desktop-app/components/common/whatsapp-ad-for-contracts";
import { WizardTopNavigation } from "desktop-app/components/common/wizard-top-navigation";
import { ContractDeliveryType } from "desktop-app/types/contractDataType";
import { shallow } from "enzyme";
import testCelebrity from "__test__/fake-data/testCelebrity";
import ContractDeliveryForm from ".";
import { CelebrityBusinessPrice } from "../celebrity-business-price";

// PENDING
// it render the celebrity's full name.

function shallowRenderContractDeliveryForm(overridePros = {}) {
  const wrapper = shallow(
    <ContractDeliveryForm
      celebrity={testCelebrity}
      isLoading={false}
      onSubmit={() => {}}
      {...overridePros}
    />
  );

  const changeContractType = wrapper
    .find(ContractTypeCards)
    .invoke("onChangeType");

  const videoDeliveryFormFieldsElements = wrapper.find(
    VideoDeliveryFormFieldsElements
  );

  const setFieldValue = videoDeliveryFormFieldsElements.invoke("onChange");
  const submitForm = videoDeliveryFormFieldsElements.invoke("onSubmit");

  const changeWizardStep = wrapper
    .find(WizardTopNavigation)
    .invoke("onStepClick");

  return {
    wrapper,
    changeContractType,
    setFieldValue,
    submitForm,
    changeWizardStep,
  };
}

it("renders without crashing", () => {
  const { wrapper } = shallowRenderContractDeliveryForm();
  expect(wrapper.exists()).toBeTruthy();
});

const initialValues: ContractDeliveryType = {
  contractType: 1,
  deliveryTo: "",
  deliveryFrom: "",
  deliveryType: 1,
};
it("renders <ContractTypeCards /> and <VideoDeliveryFormFieldsElements /> with default values when no initialValues as passed as props", () => {
  const { wrapper } = shallowRenderContractDeliveryForm();
  expect(wrapper.find(ContractTypeCards).prop("currentType")).toBe(
    initialValues.contractType
  );
  expect(wrapper.find(VideoDeliveryFormFieldsElements).props()).toEqual(
    expect.objectContaining({
      contractType: initialValues.contractType,
      deliveryTo: initialValues.deliveryTo,
      deliveryFrom: initialValues.deliveryFrom,
    })
  );
});

const initialValuesFromProps: ContractDeliveryType = {
  contractType: 2,
  deliveryTo: "Test test",
  deliveryFrom: "Lorem testing",
  deliveryType: 1,
};
it("renders <ContractTypeCards /> and <VideoDeliveryFormFieldsElements /> with values from initialValues props", () => {
  const { wrapper } = shallowRenderContractDeliveryForm({
    initialValues: initialValuesFromProps,
  });
  expect(wrapper.find(ContractTypeCards).prop("currentType")).toBe(
    initialValuesFromProps.contractType
  );
  expect(wrapper.find(VideoDeliveryFormFieldsElements).props()).toEqual(
    expect.objectContaining({
      contractType: initialValuesFromProps.contractType,
      deliveryTo: initialValuesFromProps.deliveryTo,
      deliveryFrom: initialValuesFromProps.deliveryFrom,
    })
  );
});

const useAuth = jest.spyOn(require("lib/famosos-auth"), "useAuth");

it("loads the user's name as deliveryTo field value", () => {
  const testUser = { given_name: "Tester Doe" };
  useAuth.mockImplementationOnce(() => ({
    user: testUser,
  }));

  const { wrapper } = shallowRenderContractDeliveryForm();
  expect(
    wrapper.find(VideoDeliveryFormFieldsElements).prop("deliveryTo")
  ).toEqual(testUser.given_name);
});

it("swap deliveryTo and deliveryFrom values when change contractType from 2 to 1", () => {
  const { wrapper, changeContractType } = shallowRenderContractDeliveryForm({
    initialValues: initialValuesFromProps,
  });

  expect(wrapper.find(VideoDeliveryFormFieldsElements).props()).toEqual(
    expect.objectContaining({
      deliveryTo: initialValuesFromProps.deliveryTo,
      deliveryFrom: initialValuesFromProps.deliveryFrom,
    })
  );

  changeContractType(1);

  expect(wrapper.find(VideoDeliveryFormFieldsElements).props()).toEqual(
    expect.objectContaining({
      deliveryTo: initialValuesFromProps.deliveryFrom,
      deliveryFrom: initialValuesFromProps.deliveryTo,
    })
  );
});

it("swap deliveryTo and deliveryFrom values when change contractType from 1 to 2", () => {
  const { wrapper, changeContractType } = shallowRenderContractDeliveryForm({
    initialValues: { ...initialValuesFromProps, contractType: 1 },
  });

  expect(wrapper.find(VideoDeliveryFormFieldsElements).props()).toEqual(
    expect.objectContaining({
      deliveryTo: initialValuesFromProps.deliveryTo,
      deliveryFrom: initialValuesFromProps.deliveryFrom,
    })
  );

  changeContractType(2);

  expect(wrapper.find(VideoDeliveryFormFieldsElements).props()).toEqual(
    expect.objectContaining({
      deliveryTo: initialValuesFromProps.deliveryFrom,
      deliveryFrom: initialValuesFromProps.deliveryTo,
    })
  );
});

it("renders <CelebrityBusinessPrice /> or <CelebrityVideoContractPrice /> depending on contractType", () => {
  const { wrapper, changeContractType } = shallowRenderContractDeliveryForm();

  expect(
    wrapper.containsMatchingElement(
      <CelebrityVideoContractPrice celebrity={testCelebrity} />
    )
  );

  changeContractType(2);
  expect(
    wrapper.containsMatchingElement(
      <CelebrityVideoContractPrice celebrity={testCelebrity} />
    )
  ).toBeTruthy();

  changeContractType(3);
  expect(
    wrapper.containsMatchingElement(
      <CelebrityBusinessPrice celebrity={testCelebrity} />
    )
  ).toBeTruthy();
});

const whatsappAdForContractsElement = (
  <WhatsappAdForContracts celebrityFullName={testCelebrity.fullName} />
);

it("renders <WhatsappAdForContracts /> for business flow when celebrity has no business price", () => {
  const { wrapper, changeContractType } = shallowRenderContractDeliveryForm();

  expect(
    wrapper.containsMatchingElement(whatsappAdForContractsElement)
  ).toBeFalsy();

  changeContractType(3);
  expect(
    wrapper.containsMatchingElement(whatsappAdForContractsElement)
  ).toBeTruthy();
});

const testCelebrityWithBusinessPrice = {
  celebrity: {
    ...testCelebrity,
    contractTypes: [
      {
        contractType: 1,
        name: "VideoMessage",
        description: "",
        price: 125,
        allowInFFB: false,
        options: {},
      },
      {
        contractType: 2 /* BUSINESS PRICE TYPE */,
        name: "VideoMessageSpecial1",
        description: "",
        price: 200,
        allowInFFB: false,
        options: { url: "", buttonLabel: "Contratar Evento Privado" },
      },
    ],
  },
};

it("not renders <WhatsappAdForContracts /> for business flow when celebrity has business price", () => {
  const { wrapper, changeContractType } = shallowRenderContractDeliveryForm(
    testCelebrityWithBusinessPrice
  );

  expect(
    wrapper.containsMatchingElement(whatsappAdForContractsElement)
  ).toBeFalsy();

  changeContractType(3);
  expect(
    wrapper.containsMatchingElement(whatsappAdForContractsElement)
  ).toBeFalsy();
});

// it call onSubmit prop only when the form is valid (has filled the inputs).
//  - test when not filled.
//  - test when filled.

it("not calls onSubmit prop when its form is invalid", () => {
  const onSubmit = jest.fn();
  const { submitForm } = shallowRenderContractDeliveryForm({
    onSubmit,
  });

  submitForm(undefined);
  expect(onSubmit).not.toHaveBeenCalled();
});

it("calls onSubmit prop when its form is valid", () => {
  const onSubmit = jest.fn();
  const { submitForm } = shallowRenderContractDeliveryForm({
    onSubmit,
    initialValues: initialValuesFromProps,
  });

  submitForm(undefined);
  expect(onSubmit).toHaveBeenCalledWith(initialValuesFromProps);
});

it("not pass deliveryFrom to onSubmit prop when contractType is equals to 1", () => {
  const onSubmit = jest.fn();
  const testInitialValues = { ...initialValuesFromProps, contractType: 1 };
  const { submitForm } = shallowRenderContractDeliveryForm({
    onSubmit,
    initialValues: testInitialValues,
  });

  submitForm(undefined);
  expect(onSubmit).toHaveBeenCalledWith({
    ...testInitialValues,
    deliveryFrom: "",
  });
});

it("not calls onSubmit prop when change to next wizard step with an invalid form", () => {
  const onSubmit = jest.fn();
  const { changeWizardStep } = shallowRenderContractDeliveryForm({
    onSubmit,
  });

  changeWizardStep(() => {}, true);
  expect(onSubmit).not.toHaveBeenCalled();
});

it("calls onSubmit prop when change to next wizard step with valid values", () => {
  const onSubmit = jest.fn();
  const { changeWizardStep } = shallowRenderContractDeliveryForm({
    onSubmit,
    initialValues: initialValuesFromProps,
  });

  changeWizardStep(() => {}, true);
  expect(onSubmit).toHaveBeenCalledWith(initialValuesFromProps);
});
