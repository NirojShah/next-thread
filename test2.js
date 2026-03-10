"use client";

import { useState } from "react";


export default function ThreadFormPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
  });
  const [file, setFile] = useState(null);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("author", formData.author);
    if (file) data.append("file", file);

    const res = await fetch("/api/threads", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    console.log(result);
    // alert("Thread submitted!");
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl space-y-4"
      >
        <h1 className="text-2xl font-semibold text-gray-800 text-center">Create Thread</h1>

        <div className="flex flex-col space-y-1">
          <label className="text-gray-700 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="border rounded-lg p-2 focus:outline-none focus:ring w-full"
            placeholder="Enter thread title"
            required
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="border rounded-lg p-2 focus:outline-none focus:ring w-full h-28"
            placeholder="Enter thread description"
            required
          ></textarea>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-gray-700 font-medium">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="border rounded-lg p-2 focus:outline-none focus:ring w-full"
            placeholder="Enter author name"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-gray-700 font-medium">Attachment</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="border rounded-lg p-2 focus:outline-none focus:ring w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}


// this isfor the testing.
