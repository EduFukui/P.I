import {
  BellIcon,
  Cog6ToothIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

import SearchBar from "./SearchBar";

export default function TopBar({ setSidebarOpen }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        {/* Botão abrir Sidebar */}

        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 text-gray-400 hover:bg-[#252525] hover:text-white transition"
        >
          <Bars3Icon className="w-7 h-7" />
        </button>

        <SearchBar />
      </div>

      <div className="flex items-center gap-5">
        <BellIcon
          className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white transition"
        />

        <Cog6ToothIcon
          className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white transition"
        />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <h2 className="font-semibold">Ricardo Silva</h2>

            <p className="text-xs text-lime-400">ADMIN</p>
          </div>

          <img
            src="src/imgs/image.png"
            className="
            w-12 
            h-12 
            rounded-full
            "
          />
        </div>
      </div>
    </div>
  );
}
