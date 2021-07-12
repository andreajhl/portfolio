const Adapter = require("enzyme-adapter-react-16");
const { configure } = require("enzyme");
const preloadAll = require("jest-next-dynamic");
const enableHooks = require("jest-react-hooks-shallow").default;

/* This package makes React Hooks (namely, useEffect() and useLayoutEffect()) work with shallow rendering. Use withoutHooks to opt-out this behaviour for mount rendering testing. */
enableHooks(jest);

configure({ adapter: new Adapter() });

// This utils throws a warning because the absence of the 'window' object.
jest.mock("../react-app/src/state/utils/gtm");

// This allow to tests pages using 'withAuthenticationRequired' properly, without changing the tested files.
jest.mock("@auth0/auth0-react");

// Based on https://github.com/formatjs/formatjs/issues/1477#issuecomment-693206946
jest.mock("react-intl", () => {
  const reactIntl = jest.requireActual("react-intl");
  const intl = reactIntl.createIntl({
    locale: "en",
  });

  return {
    ...reactIntl,
    useIntl: () => intl,
  };
});

global.beforeAll(async () => {
  await preloadAll();
});
