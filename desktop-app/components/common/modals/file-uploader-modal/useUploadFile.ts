import { useState } from "react";
import axios from "axios";

const uploadFormData = (uploadUrl: any, formData: FormData) =>
  axios.post(uploadUrl, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

function getFileUploadFormData(fileToUpload: any) {
  const formData = new FormData();
  formData.append("file", fileToUpload);
  return formData;
}

function useUploadFile() {
  const [status, setStatus] = useState<
    "idle" | "uploading" | "rejected" | "completed"
  >("idle");

  async function uploadFileToBucket(uploadUrl: string, fileToUpload: Blob) {
    const formData = getFileUploadFormData(fileToUpload);
    await uploadFormData(uploadUrl, formData);
    setStatus("completed");
  }

  function setErrorStatus(error: any) {
    setStatus("rejected");
    throw error;
  }

  async function upload(uploadUrl: string, fileToUpload: Blob) {
    setStatus("uploading");
    try {
      await uploadFileToBucket(uploadUrl, fileToUpload);
    } catch (error) {
      setErrorStatus(error);
    }
  }

  return { upload, status, setStatus };
}

export default useUploadFile;
