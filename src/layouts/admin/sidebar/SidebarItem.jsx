import React from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({icon, title, targetPath}) => {
  return (
    <NavLink to={targetPath} className="py-1 text-start pe-4 sidebar_menu_item siebar_items text-dark">
      <i className={`py-2 ms-3 icon ${icon} text-dark`}></i>
      <span className="hiddenable no_wrap font_08 text-dark">{title}</span>
    </NavLink>
  );
};

export default SidebarItem;
