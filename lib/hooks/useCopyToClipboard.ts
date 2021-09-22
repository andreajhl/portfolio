import copyTextToClipboard from "lib/utils/copyTextToClipboard";
import { useEffect, useState } from "react";

function useCopyToClipboard() {
  const [hasCopied, setHasCopiedLink] = useState(false);

  function copyToClipboard(text: string) {
    copyTextToClipboard(text);
    setHasCopiedLink(true);
  }

  useEffect(() => {
    if (!hasCopied) return;

    const timeout = setTimeout(() => setHasCopiedLink(false), 5000);

    return () => clearTimeout(timeout);
  }, [hasCopied]);

  return [copyToClipboard, hasCopied] as const;
}

export default useCopyToClipboard;
