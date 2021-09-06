import useUserCurrentCurrency from "./useUserCurrentCurrency";

type BaseWindowType = Window & typeof globalThis;

type WindowType = BaseWindowType & {
  userCurrencyCode: string;
};

function useSaveUserCurrencyCodeInGlobalObject() {
  const userCurrency = useUserCurrentCurrency();
  if (typeof window === "undefined") return;
  (window as WindowType).userCurrencyCode = userCurrency || "USD";
}

export default useSaveUserCurrencyCodeInGlobalObject;
