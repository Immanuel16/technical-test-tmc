import ExpandMenuIcon from "@/assets/icons/icon-expand-menu.svg";
import HomeMenuIcon from "@/assets/icons/icon-home-menu.svg";
import Logo from "@/assets/images/logo.png";
import Headers from "@/components/Header/Headers";
import DescriptionIcon from "@mui/icons-material/Description";
import { useState } from "react";
import { Menu, Sidebar, useProSidebar } from "react-pro-sidebar";
import { Outlet } from "react-router";

const MainLayout = () => {
  const { collapseSidebar } = useProSidebar();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    collapseSidebar();
    setIsCollapsed((prev) => !prev);
  };
  return (
    <div className="h-[calc(100vh-24px)] flex relative text-sm text-[#4F4F4F] font-normal">
      <Sidebar
        className={`h-[100vh] shadow-sidebar bg-white ${
          isCollapsed ? "flex justify-center items-center" : ""
        }`}
      >
        <Menu className="">
          {/* logo and toggle */}
          <div className="flex justify-between mb-4 p-3.5">
            {!isCollapsed && <img src={Logo} alt="" />}
            <button onClick={toggleSidebar}>
              <img src={ExpandMenuIcon} alt="" />
            </button>
          </div>

          <div className="flex flex-col space-y-1">
            <button className="flex space-x-3 p-3.5">
              <img src={HomeMenuIcon} />
              {!isCollapsed && <p>Dashboard</p>}
            </button>
            <button
              className="flex items-center space-x-3 p-3.5 text-white rounded-lg"
              style={{
                background:
                  "linear-gradient(332deg, #4F92E3 -40.89%, #154886 96.79%)",
              }}
            >
              <DescriptionIcon color="#fff" />
              {/* <img src={TodoMenuIcon} /> */}
              {!isCollapsed && <p>Todo</p>}
            </button>
          </div>
        </Menu>
      </Sidebar>

      <main className="flex flex-col w-full">
        <Headers />
        <div className="p-6 h-[calc(100vh-96px)] overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
