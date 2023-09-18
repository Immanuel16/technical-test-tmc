import React from "react";

const MoreMenu = ({ open, menuItem, onClickMenuItem }) => {
  return (
    <div
      className={`${
        open ? "flex" : "hidden"
      } absolute flex-col px-4  bg-white rounded-lg w-[150px] space-y-4 py-3 shadow-sidebar z-10 top-8 right-3`}
    >
      {menuItem.map((menu, idx) => (
        <button
          className="text-left"
          key={`menu-item-${idx}`}
          onClick={() => onClickMenuItem(idx + 1)}
        >
          {menu}
        </button>
      ))}
    </div>
  );
};

export default MoreMenu;
