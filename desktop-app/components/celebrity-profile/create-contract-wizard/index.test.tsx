import { getPaymentMethodsPath } from "constants/paths";
import { ContractDeliveryType } from "desktop-app/types/contractDataType";
import { shallow } from "enzyme";
import { withoutHooks } from "jest-react-hooks-shallow";
import testCelebrity from "__test__/fake-data/testCelebrity";
import { testContractInProgress } from "__test__/fake-data/testContract";
import { mountWithIntl } from "__test__/intl";
import ReduxProvider from "__test__/ReduxProvider";
import { getMockedRouterPush } from "__test__/utils";
import { CreateContractWizard } from ".";
import ContractDeliveryForm from "../contract-delivery-form";
import { ContractDetailsForm } from "../contract-details-form";
import ContractNotificationsForm from "../contract-notifications-form";

// PENDING
// **check flow after an update to the contract was made. Ex. go to next wizard step. (due to async functions, this portion is not running, I think).
// it update the first step properly.
// it update the second step properly.
// it runs unauthenticated flow properly.
// it tracks when the user leaves with an contractInProgress.
// it renders an error message when any request fails.

it("renders without crashing", () => {
  const wrapper = shallow(<CreateContractWizard celebrity={testCelebrity} />);
  expect(wrapper.exists()).toBeTruthy();
});

const mountSetup = (overrideProps = {}) =>
  mountWithIntl(
    <ReduxProvider>
      <CreateContractWizard celebrity={testCelebrity} {...overrideProps} />
    </ReduxProvider>
  );

const allSteps = [
  ContractDeliveryForm,
  ContractDetailsForm,
  ContractNotificationsForm,
] as const;

type StepType = typeof allSteps[number];

type MountSetupWrapperType = ReturnType<typeof mountSetup>;

function expectOnlyStep(wrapper: MountSetupWrapperType, step: StepType) {
  expect(wrapper.exists(step)).toBeTruthy();
  allSteps.forEach((stepComponent) => {
    if (stepComponent === step) return;
    expect(wrapper.exists(stepComponent)).toBeFalsy();
  });
}
it("renders only its first step when the users has not contractInProgress", () =>
  withoutHooks(() => {
    const wrapper = mountSetup();
    expectOnlyStep(wrapper, ContractDeliveryForm);
  }));

const testDeliveryData: ContractDeliveryType = {
  contractType: 1,
  deliveryType: 1,
  deliveryTo: "John",
  deliveryFrom: "Jane",
};

it("renders its first step properly when user's contractInProgress has status 0", () =>
  withoutHooks(() => {
    const wrapper = mountSetup({
      contractInProgress: {
        ...testContractInProgress,
        status: 0,
        ...testDeliveryData,
      },
    });

    expectOnlyStep(wrapper, ContractDeliveryForm);
    expect(wrapper.find(ContractDeliveryForm).prop("initialValues")).toEqual(
      testDeliveryData
    );
  }));

const testDetailsData = {
  occasion: "BIRTHDAY",
  instructions:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores obcaecati, odit voluptatum reprehenderit laboriosam fugiat dignissimos nobis ea quae nulla natus placeat!",
};

it("renders its second step properly when user's contractInProgress has status 1", () =>
  withoutHooks(() => {
    const wrapper = mountSetup({
      contractInProgress: {
        ...testContractInProgress,
        status: 1,
        ...testDetailsData,
      },
    });

    expectOnlyStep(wrapper, ContractDetailsForm);
    expect(wrapper.find(ContractDetailsForm).prop("initialValues")).toEqual(
      testDetailsData
    );
    expect(wrapper.find(ContractDetailsForm).prop("celebrityFullName")).toBe(
      testCelebrity.fullName
    );
    expect(wrapper.find(ContractDetailsForm).prop("deliveryTo")).toBe(
      testContractInProgress.deliveryTo
    );
  }));

const testNotificationsData = {
  deliveryContact: "testing@testing.com",
  deliveryContactCellphone: "+58 1234 5678",
  isPublic: true,
};

it("renders its third step properly when user's contractInProgress has status 2", () =>
  withoutHooks(() => {
    const wrapper = mountSetup({
      contractInProgress: {
        ...testContractInProgress,
        status: 2,
        ...testNotificationsData,
      },
    });

    expectOnlyStep(wrapper, ContractNotificationsForm);
    expect(
      wrapper.find(ContractNotificationsForm).prop("initialValues")
    ).toEqual(testNotificationsData);
  }));

/* import {
  createContract,
  updateContractStep,
} from "react-app/src/state/ducks/contracts/actions"; */

const useAuth0 = jest.spyOn(require("@auth0/auth0-react"), "useAuth0");

it("create a new contract when there is a user authenticated and does not have contractInProgress", () =>
  withoutHooks(() => {
    useAuth0.mockImplementationOnce(() => ({
      isAuthenticated: true,
    }));
    const createContract = jest
      .spyOn(
        require("react-app/src/state/ducks/contracts/actions"),
        "createContract"
      )
      .mockImplementation(() => ({ id: testContractInProgress.contractId }));

    const wrapper = mountSetup();
    wrapper.find(ContractDeliveryForm).invoke("onSubmit")(testDeliveryData);

    expect(createContract).toHaveBeenCalledWith({
      ...testDeliveryData,
      celebrityId: testCelebrity.id,
    });
  }));

// it change to the next step, and the next. (with filled data) <SubmitButton />
xit("updates contract when change steps. (with filled contractInProgress)", () =>
  withoutHooks(() => {
    useAuth0.mockImplementationOnce(() => ({
      isAuthenticated: true,
    }));
    const updateContract = jest
      .spyOn(
        require("react-app/src/state/ducks/contracts/actions"),
        "updateContract"
      )
      .mockImplementation(() => ({ reference: "123" }));
    const wrapper = mountSetup({
      contractInProgress: {
        ...testContractInProgress,
        status: 0,
      },
    });

    // wrapper.find(SubmitButton).invoke("onClick")();

    console.log(wrapper.find(ContractDeliveryForm).debug());
    /* .invoke("onClick")(null) */ expect(updateContract).toHaveBeenCalled();
  }));

it("save the contract and redirect to payment methods when submit last step.", () =>
  new Promise((resolve) => {
    withoutHooks(async () => {
      useAuth0.mockImplementationOnce(() => ({
        isAuthenticated: true,
        user: { email: "test2@testing.com", given_name: "Test Doe" },
      }));
      const testReference = "123-12345";
      const updateContractStep = jest
        .spyOn(
          require("react-app/src/state/ducks/contracts/actions"),
          "updateContractStep"
        )
        .mockImplementation(() =>
          Promise.resolve({ reference: testReference })
        );
      const push = getMockedRouterPush();

      const wrapper = mountSetup({
        contractInProgress: {
          ...testContractInProgress,
          status: 2,
        },
      });
      wrapper.find(ContractNotificationsForm).invoke("onSubmit")(
        testNotificationsData
      );

      expect(updateContractStep).toHaveBeenCalledWith(
        {
          ...testNotificationsData,
          id: testContractInProgress.contractId,
        },
        3
      );
      await new Promise((resolve) => setTimeout(resolve, 50));
      expect(push).toHaveBeenCalledWith(getPaymentMethodsPath(testReference));
      resolve(null);
    });
  }));
