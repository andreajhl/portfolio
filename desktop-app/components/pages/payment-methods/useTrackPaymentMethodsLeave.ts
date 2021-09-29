import { useEffect } from "react";
import { trackPaymentMethodsLeave } from "react-app/src/state/utils/gtm";
import { useRouter } from "next/router";

function useTrackPaymentMethodsLeave() {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", trackPaymentMethodsLeave);
    return () =>
      router.events.off("routeChangeStart", trackPaymentMethodsLeave);
  }, [router.events]);
}

export default useTrackPaymentMethodsLeave;
