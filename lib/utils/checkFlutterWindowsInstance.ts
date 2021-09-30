export interface CustomWindow {
  flutter_inappwebview: any;
}

function checkFlutterWindowsInstance() {
  return Boolean(((window as unknown) as CustomWindow).flutter_inappwebview);
}

export { checkFlutterWindowsInstance };
