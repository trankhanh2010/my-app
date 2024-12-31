import React from "react";
import ButtonLogout from "./../common/Button/ButtonLogout";
import ButtonLogin from "./../common/Button/ButtonLogin";

const NavMenu = ({  }) => {
  return (
    <ul
      className="text-sm font-medium relative top-auto right-0 bg-transparent z-10 pb-2 block"
    >
      {/* Nút đăng nhập / đăng xuất */}
      <li>
        <ButtonLogin />
      </li>
      <li>
        <ButtonLogout />
      </li>
    </ul>
  );
};

export default NavMenu;
