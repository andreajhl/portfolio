import { useState } from "react";
import axios from "axios";

const uploadFormData = (uploadUrl: any, fileToUpload: Blob) =>
  axios.put(uploadUrl, fileToUpload);

function useUploadFile() {
  const [status, setStatus] = useState<
    "idle" | "uploading" | "rejected" | "completed"
  >("idle");

  async function uploadFileToBucket(uploadUrl: string, fileToUpload: Blob) {
    setStatus("uploading");
    await uploadFormData(uploadUrl, fileToUpload);
    setStatus("completed");
  }

  function setErrorStatus(error: any) {
    setStatus("rejected");
    throw error;
  }

  async function upload(uploadUrl: string, fileToUpload: Blob) {
    try {
      await uploadFileToBucket(uploadUrl, fileToUpload);
    } catch (error) {
      setErrorStatus(error);
    }
  }

  return { upload, status, setStatus };
}

export default useUploadFile;
