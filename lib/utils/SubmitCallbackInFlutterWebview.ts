export interface CustomWindow {
  flutter: any;
}

const SubmitCallbackInFlutterWebview = ({ paymentType }) => {
  ((window as unknown) as CustomWindow).flutter._inappwebview.callHandler(
    "onSuccessPaymentCallbackFlutter",
    {
      paymentType,
    }
  );
};

export { SubmitCallbackInFlutterWebview };
