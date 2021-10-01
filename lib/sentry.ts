import { configureScope, setUser, User } from "@sentry/nextjs";
import debug from "react-app/src/utils/debug";

export function setSentryUser(user: User) {
  try {
    setUser(user);
  } catch (error) {
    debug("Sentry.setUser() Error:", error);
  }
}

export function removeSentryUser() {
  try {
    configureScope((scope) => scope.setUser(null));
  } catch (error) {
    debug("Sentry.configureScope() Error:", error);
  }
}
