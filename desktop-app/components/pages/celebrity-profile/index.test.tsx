import { CreateContractWizardSkeleton } from "desktop-app/components/celebrity-profile/create-contract-wizard/skeleton";
import { mount, shallow } from "enzyme";
import { withoutHooks } from "jest-react-hooks-shallow";
import { IntlProvider } from "react-intl";
import testCelebrity from "__test__/fake-data/testCelebrity";
import ReduxProvider from "__test__/ReduxProvider";
import { CREATE_CONTRACT_WIZARD_TEST_ID } from "__test__/testids";
import { byTestId } from "__test__/utils";
import CelebrityProfilePage, {
  CelebrityProfilePage as ConnectedCelebrityProfilePage,
} from ".";

jest.mock("lib/hooks/useGlobalFetches");
it("should renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <ConnectedCelebrityProfilePage celebrity={testCelebrity} />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});

const createContractWizardSelector = byTestId(CREATE_CONTRACT_WIZARD_TEST_ID);

const contractInProgressRequestInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: null,
};

function loadContractInProgress(wrapper, data?: { [key: string]: any }) {
  wrapper.setProps({
    contractInProgressRequest: {
      ...contractInProgressRequestInitialState,
      completed: true,
      data: data || {},
    },
  });
}

const defaultGetUserContractInProgress = jest.fn();
const defaultCleanUserContractInProgress = jest.fn();

const setup = (overrideProps = {}) =>
  shallow(
    <CelebrityProfilePage
      celebrity={testCelebrity}
      contractInProgressRequest={contractInProgressRequestInitialState}
      publicContracts={[]}
      isLoadingPublicContracts={false}
      getUserContractInProgress={defaultGetUserContractInProgress}
      cleanUserContractInProgress={defaultCleanUserContractInProgress}
      {...overrideProps}
    />
  );

const useAuth = jest.spyOn(require("lib/famosos-auth"), "useAuth");

it("should renders <CreateContractWizard /> instead of <CreateContractWizardSkeleton /> when is not authenticated", () => {
  const wrapper = setup();
  expect(
    wrapper.containsMatchingElement(<CreateContractWizardSkeleton />)
  ).toBeFalsy();
  expect(wrapper.find(createContractWizardSelector).exists()).toBeTruthy();
});

it("should renders <CreateContractWizardSkeleton /> instead of <CreateContractWizard /> when is authenticated and contractInProgressRequest is not completed", () => {
  useAuth.mockImplementationOnce(() => ({
    isAuthenticated: true,
  }));
  const wrapper = setup();
  expect(
    wrapper.containsMatchingElement(<CreateContractWizardSkeleton />)
  ).toBeTruthy();
  expect(wrapper.find(createContractWizardSelector).exists()).toBeFalsy();
});

it("should fetch contractInProgress properly, showing skeleton while loading", () => {
  useAuth.mockImplementationOnce(() => ({
    isAuthenticated: true,
  }));
  const getUserContractInProgress = jest.fn();
  const wrapper = setup({ getUserContractInProgress });

  // should calls getUserContractInProgress if is authenticated.
  expect(getUserContractInProgress).toBeCalledTimes(1);

  // should renders <CreateContractWizardSkeleton /> instead of <CreateContractWizard /> when is loading contractInProgress.
  expect(
    wrapper.containsMatchingElement(<CreateContractWizardSkeleton />)
  ).toBeTruthy();
  expect(wrapper.find(createContractWizardSelector).exists()).toBeFalsy();

  loadContractInProgress(wrapper);

  // should renders <CreateContractWizard /> instead of <CreateContractWizardSkeleton />
  // when contractInProgressRequest is completed.
  expect(
    wrapper.containsMatchingElement(<CreateContractWizardSkeleton />)
  ).toBeFalsy();
  expect(wrapper.find(createContractWizardSelector).exists()).toBeTruthy();
});

const apiService = jest.spyOn(
  require("react-app/src/state/utils/apiService"),
  "default"
);
apiService.mockImplementationOnce(() => Promise.resolve());

it("should call cleanUserContractInProgress on unmount", () => {
  withoutHooks(() => {
    const cleanUserContractInProgress = jest.fn();
    const wrapper = mount(
      <ReduxProvider>
        <IntlProvider locale="en">
          <CelebrityProfilePage
            celebrity={testCelebrity}
            contractInProgressRequest={contractInProgressRequestInitialState}
            publicContracts={[]}
            isLoadingPublicContracts={false}
            getUserContractInProgress={defaultGetUserContractInProgress}
            cleanUserContractInProgress={cleanUserContractInProgress}
          />
        </IntlProvider>
      </ReduxProvider>
    );
    expect(cleanUserContractInProgress).not.toBeCalled();
    wrapper.unmount();
    expect(cleanUserContractInProgress).toBeCalledTimes(1);
  });
});
