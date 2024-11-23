"use client";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { stringify } from "postcss";
import { useContext, createContext, useState } from "react";

const SidebarContext = createContext();
//bg-[#F3E8EB]
//bg-[#EF7575] button red

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const session = useSession();

  return (
    <aside className="h-screen ">
      <nav className="h-full inline-flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          {/*logo*/}
          <img
            src="/Logo.png"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt="Logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-300"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              {/* <h4 className="font-semibold  text-gray-600">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span> */}
              <h4 className="font-semibold  text-gray-600">
                {session?.data?.user?.username}
              </h4>
              <span className="text-xs text-gray-600">
                {session?.data?.user?.email}
              </span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}
//bg-[#EF7575]
//bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800
//"hover:bg-indigo-50 text-gray-600"
export function SidebarItem({ href, icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);
  // const ref = toString({href})

  return (
    <>
      {href ? (
        <Link href={href}>
          <li
            className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-[#EF7575] text-white"
            : "hover:bg-[#F3E8EB] text-gray-600"
        }
    `}
          >
            {icon}
            <span
              className={`overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              {text}
            </span>
            {alert && (
              <div
                className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                  expanded ? "" : "top-2"
                }`}
              />
            )}

            {!expanded && (
              <div
                className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
              >
                {text}
              </div>
            )}
          </li>
        </Link>
      ) : (
        <li
          className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-[#EF7575] text-white"
            : "hover:bg-[#F3E8EB] text-gray-600"
        }
    `}
        >
          {icon}
          <span
            className={`overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            {text}
          </span>
          {alert && (
            <div
              className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                expanded ? "" : "top-2"
              }`}
            />
          )}

          {!expanded && (
            <div
              className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
            >
              {text}
            </div>
          )}
        </li>
      )}
    </>
  );
}
