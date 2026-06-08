import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import { useState } from "react";

function MainLayout({ children }) {
  return (
    <div className="h-screen flex overflow-hidden">

      <div className="w-[220px] flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">

        <div className="flex-shrink-0">
          <Navbar />
        </div>

        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

      </div>

    </div>
  );
}

export default MainLayout;