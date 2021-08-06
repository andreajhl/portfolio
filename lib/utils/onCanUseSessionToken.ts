import { Session } from "react-app/src/state/utils/session";
import waitFor from "react-app/src/utils/waitFor";

async function onCanUseSessionToken(callback: () => any) {
  const session = new Session();
  const hasToken = await waitFor(() => Boolean(session.getToken()));
  if (!hasToken) return;
  return callback?.();
}

export default onCanUseSessionToken;
