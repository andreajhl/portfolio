import { SIGN_IN_PATH } from "constants/paths";
import { useAuth } from "lib/famosos-auth";
import { Session } from "react-app/src/state/utils/session";
import { Link, LinkProps } from "../link";

type ProtectedRouteLinkProps = {
  unauthenticatedPath?: LinkProps["href"];
  href: string;
} & Omit<LinkProps, "href">;

function ProtectedRouteLink({
  onClick,
  href,
  unauthenticatedPath = SIGN_IN_PATH,
  ...props
}: ProtectedRouteLinkProps) {
  const { isAuthenticated } = useAuth();

  function handleRedirect(event) {
    if (!isAuthenticated) {
      Session.setRedirectPathOnLogin(href);
    }

    onClick?.(event);
  }

  return (
    <Link
      href={isAuthenticated ? href : unauthenticatedPath}
      onClick={handleRedirect}
      {...props}
    />
  );
}

export { ProtectedRouteLink };
