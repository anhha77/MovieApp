import React from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      This is main layout.
      <Outlet />
    </div>
  );
}

export default MainLayout;
