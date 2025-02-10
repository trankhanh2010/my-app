import React from 'react';
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaHospital } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white py-6 mt-2">
      <div className="max-w-4xl mx-auto px-4">
        {/* Thông tin liên hệ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <p className="flex items-center">
              <FaPhoneAlt className="w-4 h-4 text-yellow-300 mr-2" />
              <span><strong>Cấp cứu (24/24):</strong> (0270) 6250 999</span>
            </p>
            <p className="flex items-center">
              <FaPhoneAlt className="w-4 h-4 text-yellow-300 mr-2" />
              <span><strong>Tổng đài:</strong> 1800 9075</span>
            </p>
            <p className="flex items-center">
              <FaClock className="w-4 h-4 text-yellow-300 mr-2" />
              <span><strong>Thời gian khám bệnh:</strong> 07:00 - 12:00 | 13:00 - 16:00</span>
            </p>
          </div>
          <div className="space-y-2">
            <p className="flex items-center">
              <FaMapMarkerAlt className="w-4 h-4 text-yellow-300 mr-2" />
              <span><strong>Địa chỉ:</strong> 68E Phạm Hùng, Phường 9, TP Vĩnh Long, Tỉnh Vĩnh Long</span>
            </p>
            <p className="flex items-center">
              <FaHospital className="w-4 h-4 text-yellow-300 mr-2" />
              <span><strong>Bệnh viện Đa khoa Xuyên Á - Vĩnh Long</strong></span>
            </p>
          </div>
        </div>

        {/* Tên bệnh viện */}
        <div className="mt-6 text-center text-sm font-semibold uppercase border-t border-gray-500 pt-3">
          © 2024 Bệnh viện Đa khoa Xuyên Á - Vĩnh Long
        </div>
      </div>
    </footer>
  );
};

export default Footer;
