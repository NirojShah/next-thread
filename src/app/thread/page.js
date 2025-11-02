"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  FaImage,
  FaVideo,
  FaFile,
  FaTimes,
  FaPaperPlane,
  FaSmile,
  FaBold,
  FaItalic,
  FaLink,
} from "react-icons/fa";

export default function CreateThreadPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const fileInputRef = useRef(null);

  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);

  const MAX_CHARS = 500;
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  // Handle text change
  const handleContentChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARS) {
      setContent(text);
      setCharCount(text.length);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File size must be less than 10MB");
      return;
    }

    setFile(selectedFile);
    setError("");

    // Create preview
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview({ type: "image", url: reader.result });
      };
      reader.readAsDataURL(selectedFile);
    } else if (selectedFile.type.startsWith("video/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview({ type: "video", url: reader.result });
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview({
        type: "file",
        name: selectedFile.name,
        size: (selectedFile.size / 1024).toFixed(2) + " KB",
      });
    }
  };

  // Remove file
  const removeFile = () => {
    setFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Convert plain text to basic HTML
  const convertToHTML = (text) => {
    return text
      .split("\n")
      .map((line) => `<p>${line || "<br>"}</p>`)
      .join("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setError("Please write something");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("uploadedBy", session?.user?.id || "user123"); // Replace with actual user ID
      formData.append("plainText", content);
      formData.append("html", convertToHTML(content));
      
      if (file) {
        formData.append("file", file);
      }

      const response = await fetch("/api/thread", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create thread");
      }

      const data = await response.json();
      router.push("/"); // Redirect to home
    } catch (err) {
      setError(err.message || "Failed to post thread");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-4"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            Create Thread
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Share your thoughts with the world
          </p>
        </div>

        {/* Main Card */}
        <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-6 relative overflow-hidden">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-slate-700/40 pointer-events-none" />

          <div className="relative z-10">
            {/* User Info */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center text-white font-semibold shadow-lg">
                {session?.user?.name?.charAt(0) || "U"}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {session?.user?.name || "Anonymous"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  @{session?.user?.username || "user"}
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 animate-in fade-in slide-in-from-top-2 duration-300">
                <p className="text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  {error}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Text Area */}
              <div className="mb-4">
                <textarea
                  value={content}
                  onChange={handleContentChange}
                  placeholder="What's on your mind?"
                  className="w-full min-h-[200px] p-4 rounded-xl bg-gray-50/50 dark:bg-slate-900/50 border border-gray-200/50 dark:border-gray-700/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 resize-none"
                />
                
                {/* Character Count */}
                <div className="flex justify-end mt-2">
                  <span
                    className={`text-sm font-medium ${
                      charCount > MAX_CHARS * 0.9
                        ? "text-red-500"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {charCount} / {MAX_CHARS}
                  </span>
                </div>
              </div>

              {/* File Preview */}
              {filePreview && (
                <div className="mb-4 p-4 rounded-xl bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-gray-700 relative group animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={removeFile}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
                  >
                    <FaTimes size={14} />
                  </button>

                  {/* Image Preview */}
                  {filePreview.type === "image" && (
                    <img
                      src={filePreview.url}
                      alt="Preview"
                      className="w-full h-auto max-h-96 object-cover rounded-lg"
                    />
                  )}

                  {/* Video Preview */}
                  {filePreview.type === "video" && (
                    <video
                      src={filePreview.url}
                      controls
                      className="w-full h-auto max-h-96 rounded-lg"
                    />
                  )}

                  {/* File Preview */}
                  {filePreview.type === "file" && (
                    <div className="flex items-center gap-3 p-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <FaFile className="text-white" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                          {filePreview.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {filePreview.size}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Toolbar */}
              <div className="flex items-center justify-between py-4 border-t border-gray-200 dark:border-gray-700">
                {/* Left Actions */}
                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*,.pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 cursor-pointer"
                    title="Upload file"
                  >
                    <FaImage size={18} />
                  </label>

                  <button
                    type="button"
                    className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
                    title="Add emoji"
                  >
                    <FaSmile size={18} />
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !content.trim()}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Posting...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane size={16} />
                      Post Thread
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Tips Card */}
        <div className="mt-6 p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-gray-200/50 dark:border-gray-700/50">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Tips for a great thread:
          </h3>
          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li>• Keep it concise and engaging</li>
            <li>• Use line breaks for better readability</li>
            <li>• Add images or videos to make it more interesting</li>
            <li>• Be respectful and follow community guidelines</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
