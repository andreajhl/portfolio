import LoadingPage from "../../layouts/loading-page";
import { useAuth } from "lib/famosos-auth";
import { ReferralOnboardingPage } from "../referral-onboarding";
import { ReferralSuccessSignUpPage } from "../referral-success-sign-up";
import { ErrorMessagePage } from "../error-message-page";
import { FormattedMessage } from "react-intl";

type ReferrerCodePageProps = {
  referrerName: string;
  referrerCode: string;
};

function ReferrerCodePage({
  referrerName,
  referrerCode,
}: ReferrerCodePageProps) {
  const { user, isLoading: isLoadingAuth, isAuthenticated } = useAuth();
  const isLoadingUser = isLoadingAuth || (isAuthenticated && !user);

  if (isLoadingUser) return <LoadingPage />;

  if (!isAuthenticated) {
    return (
      <ReferralOnboardingPage
        referrerName={referrerName}
        referrerCode={referrerCode}
      />
    );
  }

  if (user?.referrerCode) {
    return (
      <ErrorMessagePage
        title={
          <FormattedMessage defaultMessage="No puedes registrarte con este código de referido" />
        }
        description={
          <FormattedMessage defaultMessage="Parece que ya estas registrado con un código de referido" />
        }
        showRetryButton={false}
        showPath={false}
      />
    );
  }

  return <ReferralSuccessSignUpPage referrerCode={referrerCode} />;
}

export { ReferrerCodePage };
