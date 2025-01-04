import React from "react";
import { useMenuContext } from "../../context/MenuContext";
import ArrowIcon from "./ArrowIcon";
import NavMenuKhac from "./NavMenuKhac";
import NavMenuThuNgan from "./NavMenuThuNgan";

const NavMenuContainer = ({ 
    isMobileMenuOpen,
    setIsMobileMenuOpen,
 }) => {
  const { selectedMenu, setSelectedMenu } = useMenuContext();
  // Mỗi lần click sẽ mở/đóng navMenu nhỏ
  const handleOnClick = (menu) => {
    if (menu === selectedMenu) {
      // Nếu menu đang mở, toggle trạng thái
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      // Nếu chọn menu khác, mở menu mới và cập nhật menu đã chọn
      setSelectedMenu(menu);
      setIsMobileMenuOpen(true);
    }
  };
  
  const renderNavMenu = () => {
    switch (selectedMenu) {
      case "khac":
        return <NavMenuKhac isMobileMenuOpen={isMobileMenuOpen} />;
      case "thuNgan":
        return <NavMenuThuNgan isMobileMenuOpen={isMobileMenuOpen} />;
    }
  };

  return (
    <div>
      {/* Nav Selector */}
      <div className={`bg-gray-100 flex uppercase`}>
        <button
          onClick={() =>handleOnClick('khac')}
          className={`px-4 py-2 ${selectedMenu === "khac" ? "bg-indigo-500 text-white" : "bg-white text-indigo-500"} uppercase font-bold flex border-2`}
        >
          Khác  
          <ArrowIcon isRotated={selectedMenu === "khac"}/>     
        </button>
        <button
          onClick={() =>handleOnClick('thuNgan')}
          className={`px-4 py-2 ${selectedMenu === "thuNgan" ? "bg-indigo-500 text-white" : "bg-white text-indigo-500"} uppercase font-bold flex border-2`}
        >
          Thu Ngân
          <ArrowIcon isRotated={selectedMenu === "thuNgan"}/>     
        </button>
      </div>

      {/* Render Menu */}
      {renderNavMenu()}
    </div>
  );
};

export default NavMenuContainer;
