/* eslint-disable react-hooks/rules-of-hooks */

import { NextPage } from "next";
import { useIsAuthenticated } from "./famosos-auth";
import withConditionalRedirect from "./withConditionalRedirect";

/**
 * Require the user to be unauthenticated in order to render the component.
 * If the user is authenticated, forward to the given URL.
 */
const SESSION_NAME = process.env.NEXT_PUBLIC_FAMOSOS_AUTH_SESSION_NAME;

export default function withoutAuth<P>(
  WrappedComponent: NextPage<P>,
  location = "/"
): NextPage<P> {
  return withConditionalRedirect({
    WrappedComponent,
    location,
    clientCondition: function withoutAuthClientCondition() {
      return useIsAuthenticated();
    },
    serverCondition: function withoutAuthServerCondition(ctx) {
      return !!ctx.req?.cookies[SESSION_NAME];
    }
  });
}
