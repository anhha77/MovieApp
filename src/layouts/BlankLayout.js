import React from "react";
import { Outlet } from "react-router-dom";

function BlankLayout() {
  return (
    <div>
      This is blank layout.
      <Outlet />
    </div>
  );
}

export default BlankLayout;
