export interface CustomWindow {
  flutter_inappwebview: any;
}

const SubmitCallbackInFlutterWebview = ({ paymentType }) => {
  console.log("Trigger SubmitCallbackInFlutterWebview");

  ((window as unknown) as CustomWindow).flutter_inappwebview.callHandler(
    "onSuccessPaymentCallbackFlutter",
    {
      paymentType,
    }
  );
};

export { SubmitCallbackInFlutterWebview };
