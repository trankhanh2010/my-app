import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";
import useMasterService from "../../services/master/useMasterService";

const NavMenu = ({ isMobileMenuOpen }) => {
    const [authToken, setAuthToken] = useState(useMasterService.getAuthToken());
    const location = useLocation(); // Lắng nghe sự thay đổi của URL

    useEffect(() => {
        // Cập nhật trạng thái authToken mỗi khi URL thay đổi
        setAuthToken(useMasterService.getAuthToken());
    }, [location]);

    return (
        <ul
            className={`${isMobileMenuOpen ? "block" : "hidden"
                } md:flex text-sm font-semibold md:relative top-16 md:top-auto left-0  md:w-auto text-blue-700 bg-slate-50 md:flex-row flex-col md:space-y-0 space-y-4
                md:items-start overflow-x-auto`}
        >
            {/*Chỉ hiển thị khi có token */}
            {authToken && (
                <>
                    <li>
                        <CategoryDropdown />
                    </li>
                    <li>
                        <Link
                            to="/treatment-fee-list"
                            className=" block li-nav-header"
                        >
                            Viện Phí
                        </Link>
                    </li>
                </>
            )}
            {/* Viện Phí (không cần đăng nhập) */}
            <li>
                <Link
                    to="/treatment-fee-list-no-login"
                    className=" block li-nav-header"
                >
                    Viện Phí (không đăng nhập)
                </Link>
            </li>



        </ul>
    );
};

export default NavMenu;
