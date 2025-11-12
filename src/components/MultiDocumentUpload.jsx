import React, { useState, useRef } from "react";
import { FileIcon, X, Upload } from "lucide-react";

export default function MultiDocumentUpload() {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [title, setTitle] = useState("");
  const fileInputRef = useRef();

  const handleFiles = (incoming) => {
    const newFiles = Array.from(incoming).map((file) => ({
      file,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
      title,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    setTitle("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemove = (index) => {
    setFiles((prev) => {
      const copy = [...prev];
      const file = copy[index];
      if (file.preview) URL.revokeObjectURL(file.preview);
      copy.splice(index, 1);
      return copy;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Files ready to upload:",
      files.map((f) => f.file.name)
    );
    alert("Files ready to upload! Check console.");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[750px] sm:max-w-[600px] md:max-w-[500px] min-w-[150px] mx-auto bg-white rounded-2xl border border-emerald-300 shadow-lg p-6 space-y-6 transition-all"
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragActive(false);
        }}
        onDrop={handleDrop}
      >
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800">Add Documents</h2>

        {/* Document Title */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600">
            Document Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter document title"
            className="w-full border border-emerald-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none"
          />
        </div>

        {/* Upload Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 bg-emerald-50 p-4 rounded-xl">
          {/* Browse Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="flex-1 flex justify-center items-center gap-2 px-4 py-3 rounded-full text-white text-sm font-medium bg-emerald-400 hover:bg-emerald-500 transition-all"
          >
            <Upload size={16} />
            Browse
          </button>

          <input
            type="file"
            multiple
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          <span className="text-gray-500 font-medium text-sm">OR</span>

          {/* Drag & Drop */}
          <div
            className={`flex-1 border-2 border-dashed rounded-full px-4 py-3 text-center text-sm font-medium transition-all ${
              dragActive
                ? "border-emerald-500 bg-emerald-100 text-emerald-700"
                : "border-emerald-300 text-emerald-400 hover:border-emerald-400"
            }`}
          >
            Drag and Drop file here
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => {
              setFiles([]);
              setTitle("");
            }}
            className="px-4 py-2 rounded-md text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md text-sm font-medium bg-black text-white hover:bg-emerald-600 transition-all"
          >
            Add Document
          </button>
        </div>

        {/* Uploaded Files */}
        {files.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Uploaded Files
            </h3>
            <div className="space-y-2">
              {files.map((f, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-emerald-50 rounded-lg p-2 border border-emerald-100"
                >
                  <div className="flex items-center gap-3">
                    {f.preview ? (
                      <img
                        src={f.preview}
                        alt="preview"
                        className="w-10 h-10 object-cover rounded-md border"
                      />
                    ) : (
                      <FileIcon className="text-emerald-500 w-6 h-6" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-800 truncate max-w-[180px]">
                        {f.title || "Untitled"}
                      </p>
                      <p className="text-xs text-gray-500">{f.file.name}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                      <path d="M3 6h18" />
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </form>
    </>
  );
}
