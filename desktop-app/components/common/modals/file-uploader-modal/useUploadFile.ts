import { useState } from "react";
import axios from "axios";

type OnUploadProgressType = (
  progress: number,
  progressEvent?: ProgressEvent
) => void;

function getProgress(progressEvent: ProgressEvent) {
  const { loaded, total } = progressEvent;
  return Math.floor((loaded / total) * 100);
}

const uploadFormData = (
  uploadUrl: any,
  fileToUpload: Blob,
  onUploadProgress: OnUploadProgressType
) =>
  axios.put(
    uploadUrl,
    fileToUpload,
    onUploadProgress
      ? {
          onUploadProgress(progressEvent) {
            const progress = getProgress(progressEvent);
            onUploadProgress(progress, progressEvent);
          },
        }
      : undefined
  );

function useUploadFile() {
  const [status, setStatus] = useState<
    "idle" | "uploading" | "rejected" | "completed"
  >("idle");

  async function uploadFileToBucket(
    uploadUrl: string,
    fileToUpload: Blob,
    onUploadProgress: OnUploadProgressType
  ) {
    setStatus("uploading");
    await uploadFormData(uploadUrl, fileToUpload, onUploadProgress);
    setStatus("completed");
  }

  function setErrorStatus(error: any) {
    setStatus("rejected");
    throw error;
  }

  async function upload(
    uploadUrl: string,
    fileToUpload: Blob,
    onUploadProgress?: OnUploadProgressType
  ) {
    try {
      await uploadFileToBucket(uploadUrl, fileToUpload, onUploadProgress);
    } catch (error) {
      setErrorStatus(error);
    }
  }

  return { upload, status, setStatus };
}

export default useUploadFile;
