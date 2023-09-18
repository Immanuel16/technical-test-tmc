import SearchInput from "@/components/SearchInput/SearchInput";
import DatePickerIcon from "@/assets/icons/icon-datepicker.svg";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import DefaultAva from "@/assets/images/ava.jpg";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router";

const Headers = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate("login");
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logout = () => {
    localStorage.removeItem("userLogin");
    navigate("/login");
    handleCloseUserMenu();
  };
  return (
    <div className="flex space-x-8 bg-white shadow-sidebar w-full px-8 py-3.5">
      <SearchInput />
      {/* datepicker icon */}
      <button>
        <img src={DatePickerIcon} alt="" />
      </button>

      {/* user menu */}
      <div className="flex items-center space-x-3">
        <div className="flex items-end flex-col space-y-0.5">
          <p className="text-base">Sudarsono</p>
          <p className="text-[#828282] text-xs">Admin</p>
        </div>
        <>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src={DefaultAva} />
          </IconButton>
          <Menu
            sx={{ mt: "50px", paddingLeft: "22px", paddingRight: "22px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <button
              className="flex space-x-2 items-center px-[22px] py-2.5"
              onClick={logout}
            >
              <LogoutIcon />
              <p>Logout</p>
            </button>
          </Menu>
        </>
      </div>
    </div>
  );
};

export default Headers;
