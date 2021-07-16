// @ts-nocheck
import { shallow } from "enzyme";
import testContract from "__test__/fake-data/testContract";
import { testStripeCustomerSources } from "__test__/fake-data/stripe";
import StripeForm from ".";
import StripeCustomerSources from "../stripe-customer-sources";
import waitFor from "react-app/src/utils/waitFor";
import StripeCardForm from "../stripe-card-form";
import { byId, getMockedWindowMethod } from "__test__/utils";
import {
  CardIcon,
  DotCircle,
  Ellipse,
} from "desktop-app/components/common/icons";

const testFormIndex = 0;

function shallowRenderStripeForm(overrideProps = {}) {
  const wrapper = shallow(
    <StripeForm
      expanded={false}
      index={testFormIndex}
      onToggle={() => {}}
      contractPrice={testContract.price}
      contractReference={testContract.reference}
      discountCouponId={null}
      celebrityId={testContract.celebrity_id}
      {...overrideProps}
    />
  );

  return { wrapper };
}

const retrieveUserCards = jest.spyOn(
  jest.requireActual("react-app/src/state/ducks/payments/actions"),
  "retrieveUserCards"
);

const removeSource = jest.spyOn(
  jest.requireActual("react-app/src/state/ducks/payments/actions"),
  "removeSource"
);

beforeEach(() => {
  retrieveUserCards.mockReset();
  removeSource.mockReset();
});
it("renders without crashing", () => {
  retrieveUserCards.mockImplementationOnce(() => Promise.resolve({}));
  const { wrapper } = shallowRenderStripeForm();
  expect(wrapper.exists()).toBeTruthy();
});

it("fetches user's saved cards and displays it", async () => {
  retrieveUserCards.mockImplementationOnce(() =>
    Promise.resolve(testStripeCustomerSources)
  );
  const { wrapper } = shallowRenderStripeForm({ expanded: true });

  expect(retrieveUserCards).toHaveBeenCalled();
  await waitFor(() => wrapper.exists(StripeCustomerSources), 50);

  expect(
    wrapper.containsMatchingElement(
      <StripeCustomerSources
        availableSources={testStripeCustomerSources.availableSources as any}
        celebrityId={testContract.celebrity_id}
        contractReference={testContract.reference}
        discountCouponId={null}
        contractPrice={testContract.price}
      />
    )
  ).toBeTruthy();
  expect(wrapper.containsMatchingElement(<StripeCardForm />)).toBeFalsy();
});

it("renders <StripeCardForm /> as default when user does not have saved cards", async () => {
  retrieveUserCards.mockImplementationOnce(() =>
    Promise.resolve({ ...testStripeCustomerSources, availableSources: [] })
  );
  const { wrapper } = shallowRenderStripeForm({ expanded: true });

  await waitFor(() => wrapper.exists(StripeCardForm), 50);

  expect(
    wrapper.containsMatchingElement(
      <StripeCardForm
        celebrityId={testContract.celebrity_id}
        contractReference={testContract.reference}
        discountCouponId={null}
        contractPrice={testContract.price}
      />
    )
  ).toBeTruthy();
  expect(
    wrapper.containsMatchingElement(<StripeCustomerSources />)
  ).toBeFalsy();
});

it("delete user's saved card properly", async () => {
  retrieveUserCards
    .mockImplementationOnce(() => Promise.resolve(testStripeCustomerSources))
    .mockImplementationOnce(() =>
      Promise.resolve({ ...testStripeCustomerSources, availableSources: [] })
    );
  removeSource.mockImplementationOnce(() => Promise.resolve());
  const { wrapper } = shallowRenderStripeForm({ expanded: true });

  await waitFor(() => wrapper.exists(StripeCustomerSources), 50);

  const cardIndex = 0;

  wrapper.find(StripeCustomerSources).invoke("onDeleteSource")(cardIndex);

  expect(removeSource).toHaveBeenCalledWith(
    testStripeCustomerSources.availableSources[cardIndex].sourceId
  );

  await waitFor(() => wrapper.exists(StripeCardForm), 50);

  // it fetches the user's saved cards again.
  expect(retrieveUserCards).toHaveBeenCalledTimes(2);
});

it("toggles from <StripeCardForm /> to <StripeCustomerSources /> when click toggler button", async () => {
  retrieveUserCards.mockImplementation(() =>
    Promise.resolve({ ...testStripeCustomerSources })
  );
  const { wrapper } = shallowRenderStripeForm({ expanded: true });

  await waitFor(() => wrapper.exists(StripeCustomerSources), 50);
  const sectionId = `section-${testFormIndex}`;
  const togglerButton = wrapper.find(byId(sectionId)).find("button");
  togglerButton.invoke("onClick")(null);

  expect(wrapper.containsMatchingElement(<StripeCardForm />)).toBeTruthy();

  togglerButton.invoke("onClick")(null);
  expect(
    wrapper.containsMatchingElement(<StripeCustomerSources />)
  ).toBeTruthy();
});

it("renders its content only when expanded prop is true", () => {
  const { wrapper } = shallowRenderStripeForm();

  const sectionId = `section-${testFormIndex}`;

  expect(
    wrapper.containsMatchingElement(
      <div
        role="region"
        aria-labelledby={`label-${testFormIndex}`}
        id={sectionId}
        hidden={true}
      />
    )
  ).toBeTruthy();

  const { wrapper: anotherWrapper } = shallowRenderStripeForm({
    expanded: true,
  });

  expect(
    anotherWrapper.containsMatchingElement(
      <div
        role="region"
        aria-labelledby={`label-${testFormIndex}`}
        id={sectionId}
        hidden={true}
      />
    )
  ).toBeFalsy();
  expect(
    anotherWrapper.find(byId(sectionId)).children().length
  ).toBeGreaterThan(0);
});

const formLabelSelector = `div[role="button"]`;

it("renders its form label properly", () => {
  const collapsedFormLabelWrapper = shallowRenderStripeForm().wrapper.find(
    formLabelSelector
  );

  expect(
    collapsedFormLabelWrapper.containsMatchingElement(<CardIcon />)
  ).toBeTruthy();
  expect(
    collapsedFormLabelWrapper.containsMatchingElement(<Ellipse />)
  ).toBeTruthy();
  expect(
    collapsedFormLabelWrapper.containsMatchingElement(<DotCircle />)
  ).toBeFalsy();

  const expandedFormLabelWrapper = shallowRenderStripeForm({
    expanded: true,
  }).wrapper.find(formLabelSelector);
  expect(
    expandedFormLabelWrapper.containsMatchingElement(<DotCircle />)
  ).toBeTruthy();
  expect(
    expandedFormLabelWrapper.containsMatchingElement(<Ellipse />)
  ).toBeFalsy();
});

it("calls onToggle when click or press either Enter or Space keys on form label", () => {
  const onToggle = jest.fn();
  const formLabelWrapper = shallowRenderStripeForm({ onToggle }).wrapper.find(
    formLabelSelector
  );

  formLabelWrapper.invoke("onClick")(null);
  expect(onToggle).toHaveBeenCalled();

  const anyKeyEvent = { key: "a" } as any;
  formLabelWrapper.invoke("onKeyDown")(anyKeyEvent);
  expect(onToggle).toHaveBeenCalledTimes(1);

  const enterKeyEvent = { key: "Enter" } as any;
  formLabelWrapper.invoke("onKeyDown")(enterKeyEvent);
  expect(onToggle).toHaveBeenCalledTimes(2);

  const spaceKeyEvent = { key: " " } as any;
  formLabelWrapper.invoke("onKeyDown")(spaceKeyEvent);
  expect(onToggle).toHaveBeenCalledTimes(3);
});

fit("loads the Stripe instance from window object when Stripe SDK has loaded", () => {
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY;
  const mockedStripeInstance = {};
  const mockedStripe = getMockedWindowMethod(
    "Stripe",
    () => mockedStripeInstance
  );

  const { wrapper } = shallowRenderStripeForm({
    isScriptLoaded: true,
    isScriptLoadSucceed: true,
  });

  expect(mockedStripe).toHaveBeenCalledWith(stripeKey);
  expect(wrapper.prop("stripe")).toBe(mockedStripeInstance);
});
