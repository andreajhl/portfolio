import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import { useAuth } from "lib/famosos-auth";
import { useRouter } from "next/router";
import { SIGN_IN_PATH, SUBSCRIPTION } from "constants/paths";
import { Session } from "react-app/src/state/utils/session";

type GoToSubscriptionCheckoutButtonProps = {
  className?: string;
  children: ReactNode;
  celebrityUsername: string;
} & ComponentPropsWithoutRef<"button">;

function GoToSubscriptionCheckoutButton({
  className,
  children,
  celebrityUsername,
  onClick,
  ...props
}: GoToSubscriptionCheckoutButtonProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  function goToSubscriptionCheckout(event: any) {
    onClick?.(event);
    const subscriptionCheckoutPath = SUBSCRIPTION.replace(
      ":celebrity_username",
      celebrityUsername
    );
    if (isAuthenticated) {
      router.push(subscriptionCheckoutPath);
    } else {
      Session.setRedirectPathOnLogin(subscriptionCheckoutPath);
      router.push(SIGN_IN_PATH);
    }
  }

  return (
    <button
      type="button"
      className={className}
      onClick={goToSubscriptionCheckout}
      {...props}
    >
      {children}
    </button>
  );
}

export { GoToSubscriptionCheckoutButton };
