import React, { useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

const Layout: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        isAuthenticated={isAuthenticated}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
      <div className="flex flex-grow">
        {isAuthenticated && <Sidebar sidebarOpen={sidebarOpen} />}
        <main className="flex-grow transition-all duration-300 ease-in-out">
          <Outlet />
          <Toaster />
        </main>
      </div>
    </div>
  );
};

export default Layout;
