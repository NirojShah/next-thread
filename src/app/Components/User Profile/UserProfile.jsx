"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLock,
  FaHome,
  FaCity,
  FaGlobeAsia,
} from "react-icons/fa";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    houseNo: "",
    street: "",
    addressLine: "",
    city: "",
    state: "",
    country: "",
    ZipCode: "",
    password: "",
    confirmPassword: "",
  });

  // Optional: prefill from API/session
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch("/api/user/profile", { method: "GET" });
        if (!res.ok) {
          setInitialLoading(false);
          return;
        }
        const data = await res.json();

        setFormData((prev) => ({
          ...prev,
          userName: data.user?.userName || "",
          firstName: data.user?.firstName || "",
          lastName: data.user?.lastName || "",
          email: data.user?.email || "",
          phone: data.user?.phone || "",
          houseNo: data.address?.houseNo || "",
          street: data.address?.street || "",
          addressLine: data.address?.addressLine || "",
          city: data.address?.city || "",
          state: data.address?.state || "",
          country: data.address?.country || "",
          ZipCode: data.address?.ZipCode?.toString() || "",
        }));
      } catch (err) {
        console.error(err);
      } finally {
        setInitialLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setError("");
    setSuccess("");
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    setLoading(true);
    try {
      const body= {
        userName: formData.userName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: {
          houseNo: formData.houseNo,
          street: formData.street,
          addressLine: formData.addressLine,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          ZipCode: Number(formData.ZipCode),
        },
      };

      if (formData.password) {
        body.password = formData.password;
      }

      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Failed to update profile.");
      } else {
        setSuccess("Profile updated successfully.");
        // Optionally refresh or redirect
        // router.refresh();
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
        <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Profile Card */}
      <div className="relative w-full max-w-3xl mx-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-slate-700/40 pointer-events-none" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                  <span className="text-white font-bold text-2xl">@</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                    Edit Profile
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    Update your personal information and address details.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => router.push("/")}
                className="text-xs px-3 py-1 rounded-full border border-gray-300/50 dark:border-gray-600/50 text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-slate-900/40 transition-all"
              >
                Back to Home
              </button>
            </div>

            {/* Alerts */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                  {error}
                </p>
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                <p className="text-emerald-700 dark:text-emerald-400 text-sm font-medium">
                  {success}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Username */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                    </div>
                    <input
                      name="userName"
                      type="text"
                      required
                      value={formData.userName}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                      placeholder="your_handle"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                    </div>
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                      placeholder="[email protected]"
                    />
                  </div>
                </div>

                {/* First Name */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="John"
                  />
                </div>

                {/* Last Name */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="Doe"
                  />
                </div>

                {/* Phone */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaPhone className="text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                    </div>
                    <input
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                      placeholder="9876543210"
                    />
                  </div>
                </div>

                {/* ZipCode */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Zip Code
                  </label>
                  <input
                    name="ZipCode"
                    type="number"
                    required
                    value={formData.ZipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="560001"
                  />
                </div>
              </div>

              {/* Address Section */}
              <div className="border-t border-gray-200/60 dark:border-gray-700/60 pt-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-purple-500" />
                  Address
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* House No */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      House No
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaHome className="text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                      </div>
                      <input
                        name="houseNo"
                        type="text"
                        required
                        value={formData.houseNo}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                        placeholder="123/A"
                      />
                    </div>
                  </div>

                  {/* Street */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Street
                    </label>
                    <input
                      name="street"
                      type="text"
                      required
                      value={formData.street}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                      placeholder="Main Street"
                    />
                  </div>

                  {/* Address Line */}
                  <div className="group md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address Line
                    </label>
                    <input
                      name="addressLine"
                      type="text"
                      required
                      value={formData.addressLine}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                      placeholder="Near XYZ Landmark"
                    />
                  </div>

                  {/* City */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaCity className="text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                      </div>
                      <input
                        name="city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                        placeholder="Bengaluru"
                      />
                    </div>
                  </div>

                  {/* State */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      State
                    </label>
                    <input
                      name="state"
                      type="text"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                      placeholder="Karnataka"
                    />
                  </div>

                  {/* Country */}
                  <div className="group md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Country
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaGlobeAsia className="text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                      </div>
                      <input
                        name="country"
                        type="text"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                        placeholder="India"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div className="border-t border-gray-200/60 dark:border-gray-700/60 pt-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <FaLock className="text-purple-500" />
                  Change Password (optional)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      New Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                      placeholder="Leave blank to keep current"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <input
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                      placeholder="Re-enter new password"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>

            <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
              Your information is securely stored and used only to personalize your @thread experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
