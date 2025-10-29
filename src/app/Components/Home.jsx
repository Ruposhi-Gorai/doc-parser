"use client"
import React, { useRef, useState, useCallback } from "react";

export default function FileUpload({
  accept = "*/*",
  multiple = false,
  maxSize = 5 * 1024 * 1024, // 5MB
  onChange = () => {},
}) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const resetErrorLater = useCallback(() => {
    setTimeout(() => setError(""), 4000);
  }, []);

  const handleFiles = useCallback(
    (incomingFiles) => {
      setError("");
      const incoming = incomingFiles[0];
      if (!incoming) return;

      if (incoming.size > maxSize) {
        setError(`${incoming.name} is too large (>${Math.round(maxSize / 1024 / 1024)}MB).`);
        resetErrorLater();
        return;
      }

      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const preview = incoming.type.startsWith("image/") ? URL.createObjectURL(incoming) : null;
      const newFile = { file: incoming, preview, id, progress: 0 };

      setFile(newFile);
      onChange(incoming);

      const interval = setInterval(() => {
        setFile((prev) => {
          if (!prev) return prev;
          const nextProgress = Math.min(prev.progress + Math.round(Math.random() * 20), 100);
          return { ...prev, progress: nextProgress };
        });
      }, 300);

      setTimeout(() => {
        clearInterval(interval);
        setFile((prev) => (prev ? { ...prev, progress: 100 } : prev));
      }, 3100);
    },
    [maxSize, onChange, resetErrorLater]
  );

  const onInputChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = null;
  };

  const onRemove = () => {
    setFile(null);
    onChange(null);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const dtFiles = e.dataTransfer.files;
    handleFiles(dtFiles);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <label className="block text-sm font-medium text-gray-700 mb-2">Upload a file</label>

      <div
        className={`relative rounded-lg border-2 border-dashed p-4 transition-colors focus-within:ring-2 focus-within:ring-offset-2 cursor-pointer select-none
          ${dragActive ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-white"}`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openFilePicker();
        }}
        aria-label="File upload dropzone"
      >
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          onChange={onInputChange}
          accept={accept}
          multiple={multiple}
        />

        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 rounded-md flex items-center justify-center bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h6l6 6v3a4 4 0 01-4 4H7z" />
              </svg>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-900">Drag & drop your file here, or</p>
            <div className="mt-1 sm:flex sm:items-center sm:gap-2">
              <button
                type="button"
                onClick={openFilePicker}
                className="inline-flex items-center rounded-md border px-3 py-1 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1"
              >
                Browse
              </button>
              <p className="mt-1 text-xs text-gray-500 sm:mt-0">Any file type — up to {Math.round(maxSize / 1024 / 1024)}MB</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 text-sm min-h-[1.25rem]">
        {error ? (
          <p className="text-red-600" role="alert" aria-live="assertive">{error}</p>
        ) : (
          <p className="text-gray-500">Only one file allowed.</p>
        )}
      </div>

      {file && (
        <div className="mt-4 rounded-lg border p-3 bg-white shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex-none w-16 h-16 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center">
              {file.preview ? (
                <img src={file.preview} alt={file.file.name} className="object-cover w-full h-full" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v7a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-medium text-sm truncate">{file.file.name}</p>
                  <p className="text-xs text-gray-500">{(file.file.size / 1024).toFixed(0)} KB</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onRemove}
                    aria-label={`Remove ${file.file.name}`}
                    className="text-gray-400 hover:text-gray-700 focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H3.5A1.5 1.5 0 002 5.5v1A.5.5 0 002.5 7H17.5a.5.5 0 00.5-.5v-1A1.5 1.5 0 0016.5 4H15V3a1 1 0 00-1-1H6zm3 6a1 1 0 011 1v6a1 1 0 11-2 0V9a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-3">
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${file.progress}%`, backgroundColor: "rgba(59,130,246,0.85)" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 text-xs text-gray-400 truncate">{file.file.type || "Unknown type"}</div>
        </div>
      )}
    </div>
  );
}

