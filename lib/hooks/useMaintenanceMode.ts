import { REDIRECT_BEFORE_MAINTENANCE_KEY } from "constants/keys";
import { MAINTENANCE_PATH } from "constants/paths";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import firebase from "react-app/src/firebase/init";
import { ROOT_PATH } from "react-app/src/routing/Paths";
import getWindow from "react-app/src/utils/getWindow";

const collectionPath =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
    ? "production_servicing"
    : "dev_servicing";

const firestore = firebase.firestore();

function removeRedirectBeforeMaintenance() {
  getWindow()?.localStorage.removeItem(REDIRECT_BEFORE_MAINTENANCE_KEY);
}

function setRedirectBeforeMaintenance() {
  getWindow()?.localStorage.setItem(
    REDIRECT_BEFORE_MAINTENANCE_KEY,
    getWindow()?.location?.pathname
  );
}

function getRedirectBeforeMaintenancePath() {
  return (
    getWindow()?.localStorage.getItem(REDIRECT_BEFORE_MAINTENANCE_KEY) ||
    ROOT_PATH
  );
}

function useMaintenanceMode() {
  const router = useRouter();
  const [isInMaintenance, setIsInMaintenance] = useState<boolean>();

  useEffect(() => {
    const unsubscribe = firestore
      .collection(collectionPath)
      .onSnapshot((snapshot) => {
        const firstResult = snapshot?.docChanges?.()?.[0]?.doc;
        setIsInMaintenance(Boolean(firstResult?.data?.()?.isServicing));
      });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (typeof isInMaintenance === "undefined") return;
    if (isInMaintenance) {
      setRedirectBeforeMaintenance();
      router.push(MAINTENANCE_PATH);
    } else if (router.pathname === MAINTENANCE_PATH) {
      router.push(getRedirectBeforeMaintenancePath());
      removeRedirectBeforeMaintenance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInMaintenance]);
}

export default useMaintenanceMode;
