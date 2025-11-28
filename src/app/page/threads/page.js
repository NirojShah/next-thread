"use client";

import React, { useEffect, useState } from "react";
import { FaHeart, FaComment, FaShare, FaBookmark } from "react-icons/fa";

const Threads = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchThreads();
  }, [page]);

  const fetchThreads = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/thread?page=${page}&limit=10`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch threads");
      }

      const result = await response.json();
      setThreads(result.data);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load threads");
    } finally {
      setLoading(false);
    }
  };

  const formatBase64Image = (base64Data, contentType) => {
    return `data:${contentType};base64,${base64Data}`;
  };

  const getUserInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return (first + last).toUpperCase() || "U";
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg
            className="animate-spin h-12 w-12 text-purple-500"
            viewBox="0 0 24 24"
          >
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
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Loading threads...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 flex items-center justify-center p-4">
        <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8 max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <span className="text-3xl">⚠️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <button
              onClick={fetchThreads}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6 ">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            Latest Threads
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Discover what everyone is talking about
          </p>
        </div>

        {/* Threads List */}
        
        {threads.length === 0 ? (
          <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center opacity-50">
              <span className="text-4xl">📝</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              No threads yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Be the first to share something!
            </p>
          </div>
        ) : (
          threads.map((thread) => (
            <article
              key={thread._id}
              className="backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 overflow-hidden transition-all duration-300 hover:shadow-purple-500/20 hover:shadow-3xl animate-in fade-in slide-in-from-bottom-2"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-slate-700/40 pointer-events-none" />

              <div className="relative z-10 p-6">
                {/* User Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center text-white font-semibold shadow-lg">
                    {getUserInitials(
                      thread.uploadedBy?.firstName,
                      thread.uploadedBy?.lastName
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {thread.uploadedBy?.firstName}{" "}
                      {thread.uploadedBy?.lastName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      @{thread.uploadedBy?.userName} •{" "}
                      {getTimeAgo(thread.file?.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Thread Content */}
                <div
                  className="text-gray-800 dark:text-gray-200 mb-4 prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: thread.html }}
                />

                {/* Thread Image */}
                {thread.file && thread.file.contentType.startsWith("image/") && (
                  <div className="mb-4 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <img
                      src={formatBase64Image(
                        thread.file.data,
                        thread.file.contentType
                      )}
                      alt={thread.file.fileName}
                      className="w-full h-auto max-h-[500px] object-cover"
                    />
                  </div>
                )}

                {/* Thread Video */}
                {thread.file && thread.file.contentType.startsWith("video/") && (
                  <div className="mb-4 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <video
                      src={formatBase64Image(
                        thread.file.data,
                        thread.file.contentType
                      )}
                      controls
                      className="w-full h-auto max-h-[500px]"
                    />
                  </div>
                )}

                {/* Interaction Buttons */}
                <div className="flex items-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 group-hover:bg-pink-100 dark:group-hover:bg-pink-900/30 flex items-center justify-center transition-all duration-300">
                      <FaHeart size={14} />
                    </div>
                    <span className="text-sm font-medium">0</span>
                  </button>

                  <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 flex items-center justify-center transition-all duration-300">
                      <FaComment size={14} />
                    </div>
                    <span className="text-sm font-medium">0</span>
                  </button>

                  <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 flex items-center justify-center transition-all duration-300">
                      <FaShare size={14} />
                    </div>
                  </button>

                  <button className="ml-auto flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 flex items-center justify-center transition-all duration-300">
                      <FaBookmark size={14} />
                    </div>
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default Threads;
