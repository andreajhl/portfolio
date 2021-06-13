import { useState } from "react";

export type StatusType = "idle" | "loading" | "completed" | "rejected";

function useStatus(initialStatus = "idle" as StatusType) {
  return useState<StatusType>(initialStatus);
}

export default useStatus;
