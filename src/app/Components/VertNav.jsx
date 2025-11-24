// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState } from "react";
// import { FaHome, FaTachometerAlt, FaCog, FaUser, FaChartLine, FaBell } from "react-icons/fa";

// const menuItems = [
//   { name: "Home", href: "/", icon: FaHome },
//   { name: "Dashboard", href: "/dashboard", icon: FaTachometerAlt },
//   { name: "Analytics", href: "/analytics", icon: FaChartLine },
//   { name: "Profile", href: "/profile", icon: FaUser },
//   { name: "Notifications", href: "/notifications", icon: FaBell },
//   { name: "Settings", href: "/settings", icon: FaCog },
// ];

// export default function VertNav() {
//   const pathname = usePathname();
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [hoveredItem, setHoveredItem] = useState(null);

//   return (
//     <nav
//       onMouseEnter={() => setIsExpanded(true)}
//       onMouseLeave={() => setIsExpanded(false)}
//       className={`
//         fixed left-0 top-0 h-screen
//         ${isExpanded ? "w-64" : "w-20"}
//         transition-all duration-300 ease-in-out
//         backdrop-blur-xl bg-white/80 dark:bg-slate-900/80
//         border-r border-gray-200/50 dark:border-gray-700/50
//         shadow-2xl shadow-gray-200/20 dark:shadow-black/20
//         flex flex-col py-6 px-3
//         z-50 group
//       `}
//     >
//       <div className="mb-8 px-2">
//         <div className="flex items-center gap-3 overflow-hidden">
//           <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
//             <span className="text-white font-bold text-lg">P</span>
//           </div>
//           <span 
//             className={`
//               font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent
//               whitespace-nowrap transition-all duration-300
//               ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
//             `}
//           >
//             Portfolio
//           </span>
//         </div>
//       </div>
//       <div className="flex-1 space-y-2">
//         {menuItems.map((item, index) => {
//           const Icon = item.icon;
//           const isActive = pathname === item.href;
          
//           return (
//             <div
//               key={item.href}
//               className="relative"
//               onMouseEnter={() => setHoveredItem(index)}
//               onMouseLeave={() => setHoveredItem(null)}
//             >
//               <Link
//                 href={item.href}
//                 className={`
//                   flex items-center gap-4 px-4 py-3.5 rounded-xl
//                   transition-all duration-300 ease-out
//                   relative overflow-hidden group/item
//                   ${
//                     isActive
//                       ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30"
//                       : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-slate-800/80"
//                   }
//                 `}
//               >
//                 {isActive && (
//                   <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
//                 )}
//                 <div className={`
//                   flex-shrink-0 transition-transform duration-300
//                   ${isActive ? "scale-110" : "group-hover/item:scale-110"}
//                 `}>
//                   <Icon size={22} />
//                 </div>
//                 <span
//                   className={`
//                     whitespace-nowrap font-medium transition-all duration-300
//                     ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
//                     ${isActive ? "font-semibold" : ""}
//                   `}
//                 >
//                   {item.name}
//                 </span>
//                 {!isActive && (
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover/item:from-blue-500/5 group-hover/item:via-purple-500/5 group-hover/item:to-blue-500/5 transition-all duration-300 rounded-xl" />
//                 )}
//               </Link>
//               {!isExpanded && hoveredItem === index && (
//                 <div className="absolute left-full ml-6 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm font-medium rounded-lg shadow-xl whitespace-nowrap z-50 animate-in fade-in slide-in-from-left-2 duration-200">
//                   {item.name}
//                   <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900 dark:border-r-gray-800" />
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//       <div className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
//         <div className={`
//           flex items-center gap-3 px-3 py-2 rounded-xl
//           transition-all duration-300
//           hover:bg-gray-100/80 dark:hover:bg-slate-800/80 cursor-pointer
//         `}>
//           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex-shrink-0 shadow-lg" />
//           <div className={`
//             overflow-hidden transition-all duration-300
//             ${isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"}
//           `}>
//             <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">
//               John Doe
//             </p>
//             <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
//               Developer
//             </p>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
