import { useState } from "react";

function useIsOpen(initialIsOpen = false) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return { isOpen, setIsOpen, open, close };
}

export default useIsOpen;
