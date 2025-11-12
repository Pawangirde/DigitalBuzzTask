import React from "react";
import MultiDocumentUpload from "../components/ReUseMultiFileUploader/MultiDocumentUpload";

export default function MultiUploadPage() {
  return (
    <>
      <div className="">
        <h1 className="text-2xl font-semibold mb-4">
          Multi-Document Upload Form
        </h1>
      </div>
      <div className="justify-items-start">
        <MultiDocumentUpload />
      </div>
    </>
  );
}
