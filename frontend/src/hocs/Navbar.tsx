import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-teal-600 p-4 fixed w-full z-10 top-0 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Amco PM</div>
        <div className="space-x-4">
          <button className="text-white">Workspaces</button>
          <button className="text-white">Recent</button>
          <button className="text-white">Templates</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
