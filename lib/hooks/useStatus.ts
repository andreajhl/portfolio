import { useState } from "react";

type StatusType = "idle" | "loading" | "completed";

function useStatus(initialStatus = "idle" as StatusType) {
  return useState<StatusType>(initialStatus);
}

export default useStatus;
