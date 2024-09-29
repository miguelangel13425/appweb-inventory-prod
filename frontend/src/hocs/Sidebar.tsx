import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-blue-900 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out z-20">
      <nav>
        <ul>
          <li className="py-2 px-4 hover:bg-blue-700 rounded">Dashboard</li>
          <li className="py-2 px-4 hover:bg-blue-700 rounded">Projects</li>
          <li className="py-2 px-4 hover:bg-blue-700 rounded">Tasks</li>
          <li className="py-2 px-4 hover:bg-blue-700 rounded">Reports</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
