// @ts-nocheck
export const byText = (text: string) => `[children="${text}"]`;
export const byTestId = (testId: string) => `[data-testid="${testId}"]`;
export const byId = (id: string) => `#${id}`;

export function getMockedRouterPush() {
  const useRouter = jest.spyOn(require("next/router"), "useRouter");
  const push = jest.fn();
  useRouter.mockImplementation(() => ({ push, events: { on() {}, off() {} } }));
  return push;
}

export function getMockedWindowMethod(
  methodName: string,
  implementation?: () => any
) {
  const mockedMethod = jest.fn(implementation);
  const originalWindow = { ...window };
  const windowSpy = jest.spyOn(global, "window", "get");
  windowSpy.mockImplementation(() => ({
    ...originalWindow,
    [methodName]: mockedMethod,
  }));
  return mockedMethod;
}
