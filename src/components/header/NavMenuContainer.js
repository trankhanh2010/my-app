import React, { useRef, useState } from "react";
import { useMenuContext } from "../../context/MenuContext";
import ArrowIcon from "./ArrowIcon";
import NavMenuKhac from "./navMenu/NavMenuKhac";
import NavMenuThuNgan from "./navMenu/NavMenuThuNgan";
import NavMenuXacThuc from "./navMenu/NavMenuXacThuc";
import NavMenuKhoa from "./navMenu/NavMenuKhoa";

const NavMenuContainer = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { selectedMenu, setSelectedMenu } = useMenuContext();
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleOnClick = (menu) => {
    if (menu === selectedMenu) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setSelectedMenu(menu);
      setIsMobileMenuOpen(true);
    }
  };

  const startDrag = (e) => {
    const container = scrollContainerRef.current;
    setIsDragging(true);
    setStartX(e.pageX || e.touches[0].pageX); // Lấy vị trí chuột hoặc cảm ứng
    setScrollLeft(container.scrollLeft);
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    const container = scrollContainerRef.current;
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - startX) * 1; // Tốc độ cuộn
    container.scrollLeft = scrollLeft - walk;
  };

  const endDrag = () => {
    setIsDragging(false);
  };

  const renderNavMenu = () => {
    switch (selectedMenu) {
      case "khac":
        return <NavMenuKhac isMobileMenuOpen={isMobileMenuOpen} />;
      case "thuNgan":
        return <NavMenuThuNgan isMobileMenuOpen={isMobileMenuOpen} />;
      case "xacThuc":
        return <NavMenuXacThuc isMobileMenuOpen={isMobileMenuOpen} />;
      case "khoa":
        return <NavMenuKhoa isMobileMenuOpen={isMobileMenuOpen} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Nav Selector */}
      <div className="relative bg-gray-100 flex items-center">
        {/* Left Arrow */}
        <button
          onClick={() => scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" })}
          className="absolute left-0 z-10 px-2 py-1 bg-gray-200 hover:bg-gray-300"
        >
          {"<"}
        </button>

        {/* Scrollable Menu */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto no-scrollbar mx-8"
          onMouseDown={startDrag}
          onMouseMove={onDrag}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onTouchStart={startDrag}
          onTouchMove={onDrag}
          onTouchEnd={endDrag}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          <button
            onClick={() => handleOnClick("khac")}
            className={`px-4 py-2 ${selectedMenu === "khac"
              ? "bg-indigo-500 text-white"
              : "bg-white text-indigo-500"
              } uppercase font-bold flex border-x-2`}
          >
            Khác
            <ArrowIcon isRotated={selectedMenu === "khac"} />
          </button>
          <button
            onClick={() => handleOnClick("thuNgan")}
            className={`px-4 py-2 ${selectedMenu === "thuNgan"
              ? "bg-indigo-500 text-white"
              : "bg-white text-indigo-500"
              } uppercase font-bold flex border-x-2`}
          >
            Thu Ngân
            <ArrowIcon isRotated={selectedMenu === "thuNgan"} />
          </button>
          <button
            onClick={() => handleOnClick("xacThuc")}
            className={`px-4 py-2 ${selectedMenu === "xacThuc"
              ? "bg-indigo-500 text-white"
              : "bg-white text-indigo-500"
              } uppercase font-bold flex border-x-2`}
          >
            Xác thực
            <ArrowIcon isRotated={selectedMenu === "xacThuc"} />
          </button>
          <button
            onClick={() => handleOnClick("khoa")}
            className={`px-4 py-2 ${selectedMenu === "khoa"
              ? "bg-indigo-500 text-white"
              : "bg-white text-indigo-500"
              } uppercase font-bold flex border-x-2`}
          >
            Khoa
            <ArrowIcon isRotated={selectedMenu === "khoa"} />
          </button>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" })}
          className="absolute right-0 z-10 px-2 py-1 bg-gray-200 hover:bg-gray-300"
        >
          {">"}
        </button>
      </div>

      {/* Render Menu */}
      {renderNavMenu()}
    </div>
  );
};

export default NavMenuContainer;
