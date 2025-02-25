import React from "react";
import Logo from "../assets/react.svg";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className=" bg-gray-200 flex flex-col fixed top-0 z-30 bottom-0 items-center">
      <div className="flex items-center justify-between mb-20 p-3 gap-3">
        <div className="w-8 h-8 bg-green-700 rounded-full"></div>
        <h3 className="font-bold">My company</h3>
      </div>
      <ul className="flex flex-col gap-4 mb-20 ">
        <h2>Quick Action</h2>
        <h2>Customers</h2>
        <h2>Teams</h2>
        <h2>Settings</h2>
      </ul>
    </aside>
  );
};

export default Sidebar;
