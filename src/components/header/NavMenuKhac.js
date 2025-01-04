import React, { useState, useEffect } from "react";
import CategoryDropdown from "./CategoryDropdown";
import { useAuth } from '../../context/AuthContext';

const NavMenu = ({ isMobileMenuOpen }) => {
    const { authToken } = useAuth();

    return (
        <ul
            className={`${isMobileMenuOpen ? "block md:flex text-sm font-semibold md:relative top-16 md:top-auto left-0  md:w-auto text-blue-700 bg-slate-50 md:flex-row flex-col md:space-y-0 space-y-4 md:items-start overflow-x-auto" 
                : "hidden"} `}
        >
            {/*Chỉ hiển thị khi có token */}
            {authToken && (
                <>
                    <li>
                        <CategoryDropdown />
                    </li>
                </>
            )}
          
        </ul>
    );
};

export default NavMenu;
