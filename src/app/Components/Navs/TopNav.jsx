"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  FaSearch, 
  FaBell, 
  FaUserCircle, 
  FaCog, 
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaChevronDown,
  FaHome,
  FaCompass,
  FaHeart,
  FaEdit
} from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/", icon: FaHome },
  { name: "Explore", href: "/explore", icon: FaCompass },
  { name: "Activity", href: "/activity", icon: FaHeart },
];

export default function TopNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Detect scroll for navbar shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown-container')) {
        setUserMenuOpen(false);
        setNotificationOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Mock notifications
  const notifications = [
    { id: 1, text: "John liked your thread", time: "2m ago", unread: true },
    { id: 2, text: "Sarah replied to your thread", time: "1h ago", unread: true },
    { id: 3, text: "New follower: Alex Parker", time: "2h ago", unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-in-out
        ${
          scrolled
            ? "backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 shadow-lg shadow-gray-200/20 dark:shadow-black/30"
            : "bg-transparent"
        }
`}
    >
<div className="w-full px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">
          
          {/* Left Section - Logo & Nav Links */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center shadow-lg shadow-purple-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <span className="text-white font-bold text-lg">@</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent hidden sm:block">
                thread
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      relative px-4 py-2 rounded-xl text-sm font-medium
                      flex items-center gap-2
                      transition-all duration-300 ease-out
                      ${
                        isActive
                          ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20"
                          : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100/50 dark:hover:bg-slate-800/50"
                      }
                    `}
                  >
                    <Icon size={18} />
                    <span>{link.name}</span>
                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2">
            {/* Create Thread Button */}
            <Link
              href="/thread"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105"
            >
              <FaEdit size={16} />
              <span className="text-sm">Thread</span>
            </Link>
            {/* Mobile Create Button */}
            <Link
              href="/create"
              className="sm:hidden w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-110"
            >
              <FaEdit size={16} />
            </Link>

            {/* Search Bar */}
            <div className={`
              relative transition-all duration-300 ease-in-out
              ${searchOpen ? "w-64" : "w-10"}
            `}>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors z-10"
              >
                <FaSearch size={16} />
              </button>
              <input
                type="text"
                placeholder="Search threads..."
                className={`
                  w-full h-10 pl-10 pr-4 rounded-xl
                  bg-gray-100/80 dark:bg-slate-800/80
                  border border-gray-200/50 dark:border-gray-700/50
                  text-gray-900 dark:text-gray-100
                  placeholder:text-gray-500 dark:placeholder:text-gray-400
                  focus:outline-none focus:ring-2 focus:ring-purple-500/50
                  transition-all duration-300
                  ${searchOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
              />
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-10 rounded-xl bg-gray-100/80 dark:bg-slate-800/80 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-110"
            >
              {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>

            {/* Notifications */}
            <div className="relative dropdown-container">
              <button
                onClick={() => {
                  setNotificationOpen(!notificationOpen);
                  setUserMenuOpen(false);
                }}
                className="relative w-10 h-10 rounded-xl bg-gray-100/80 dark:bg-slate-800/80 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-110"
              >
                <FaBell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-white text-xs flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Activity</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`
                          p-4 border-b border-gray-100 dark:border-gray-700/50
                          hover:bg-gray-50 dark:hover:bg-slate-700/50
                          transition-colors cursor-pointer
                          ${notif.unread ? "bg-purple-50/50 dark:bg-purple-900/10" : ""}
                        `}
                      >
                        <div className="flex items-start gap-3">
                          {notif.unread && (
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mt-2 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 dark:text-gray-100">{notif.text}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700">
                    <Link href="/activity" className="text-sm text-purple-600 dark:text-purple-400 hover:underline font-medium">
                      View all activity
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative dropdown-container">
              <button
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  setNotificationOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100/80 dark:bg-slate-800/80 hover:bg-gray-200/80 dark:hover:bg-slate-700/80 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                  JD
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                  John Doe
                </span>
                <FaChevronDown 
                  size={12} 
                  className={`text-gray-500 transition-transform duration-300 ${userMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* User Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-gray-900 dark:text-gray-100">John Doe</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">@johndoe</p>
                  </div>
                  <div className="p-2">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <FaUserCircle size={18} />
                      <span className="text-sm font-medium">Profile</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <FaCog size={18} />
                      <span className="text-sm font-medium">Settings</span>
                    </Link>
                  </div>
                  <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                    <button 
                      className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" 
                      onClick={() => signOut()}
                    >
                      <FaSignOutAlt size={18} />
                      <span className="text-sm font-medium">Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
