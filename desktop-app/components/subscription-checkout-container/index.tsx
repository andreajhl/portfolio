import { useCallback, useEffect, useState } from "react";
import {
  removeSpreedlyUserSource,
  retrieveSpreedlyUserSources,
} from "react-app/src/state/ducks/payments/actions";
import { FormattedMessage } from "react-intl";
import SubmitButton from "../common/button/submit-button";
import { LoadingSpinner } from "../common/loading-spinner";
import SubscriptionCustomerSources from "../payments-methods/subscription-customer-sources";
import { SpreedlyCheckoutForm } from "../subscription-checkout/spreedly-checkout-form";

type SubscriptionCheckoutContainerProps = {
  celebrityId: string;
};

function SubscriptionCheckoutContainer({
  celebrityId,
}: SubscriptionCheckoutContainerProps) {
  const [isLoading, setLoading] = useState(true);
  const [userSources, setUserSources] = useState([]);
  const [mode, setMode] = useState<"selectSource" | "addSource">(null);

  const fetchUserSources = useCallback(async () => {
    const response = (await retrieveSpreedlyUserSources()) as {
      cardType: string;
      token: string;
      lastFourDigits: string;
    }[];

    if (Array.isArray(response)) {
      setUserSources(response);
      setMode("selectSource");
    } else {
      setUserSources([]);
      setMode("addSource");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUserSources();
  }, []);

  const toggleMode = () => {
    setMode((mode) => (mode === "selectSource" ? "addSource" : "selectSource"));
  };

  const removeSpreedlySource = async (token) => {
    await removeSpreedlyUserSource(token)
      .then(() => {
        fetchUserSources();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (userSources.length === 0 || mode === "addSource") {
    return (
      <>
        <SpreedlyCheckoutForm celebrityId={celebrityId} />
        {userSources.length !== 0 && (
          <SubmitButton
            onClick={() => toggleMode()}
            variant="tertiary"
            style={{
              marginTop: "0.8rem",
            }}
          >
            <FormattedMessage defaultMessage="Seleccionar una tarjeta" />
          </SubmitButton>
        )}
      </>
    );
  } else {
    return (
      <>
        <SubscriptionCustomerSources
          sources={userSources}
          celebrityId={celebrityId}
          onDeleteSource={removeSpreedlySource}
        />
        <SubmitButton
          onClick={() => toggleMode()}
          variant="tertiary"
          style={{
            marginTop: "0.8rem",
          }}
        >
          <FormattedMessage defaultMessage="Agregar nueva tarjeta" />
        </SubmitButton>
      </>
    );
  }
}

export { SubscriptionCheckoutContainer };
