import { useEffect } from "react";
import { useRouter } from "next/router";
import { getWindowPathname } from "react-app/src/utils/getWindow";

/**
 * To handle a popup state and allowing the user to press back button, closing the modal and not returning to the previous page.
 */
function usePopupWithBackButton(initialIsOpen?: boolean) {
  const router = useRouter();
  const modalIsOpen = Boolean(router.query?.modalIsOpen);

  function openModal() {
    const pathname = getWindowPathname();
    router.push({ pathname, query: { modalIsOpen: true } });
  }

  function closeModal() {
    const pathname = getWindowPathname();
    router.replace(pathname);
  }

  useEffect(() => {
    if (initialIsOpen) openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [modalIsOpen, openModal, closeModal] as const;
}

export default usePopupWithBackButton;
