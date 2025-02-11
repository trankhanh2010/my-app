import React from "react";
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaHospital } from "react-icons/fa";

const Footer = () => {
  const googleMapsLink = "https://www.google.com/maps/place/B%E1%BB%87nh+vi%E1%BB%87n+%C4%91a+khoa+Xuy%C3%AAn+%C3%81+V%C4%A9nh+Long/@10.2605328,105.9405192,17z";

  return (
    <footer className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white py-6 mt-2">
      <div className="max-w-5xl mx-auto px-4">
        {/* Thông tin liên hệ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <p className="flex items-center">
              <FaPhoneAlt className="w-4 h-4 text-yellow-300 mr-2" />
              <span>
                <strong>Cấp cứu (24/24):</strong> (0270) 6250 999
              </span>
            </p>
            <p className="flex items-center">
              <FaPhoneAlt className="w-4 h-4 text-yellow-300 mr-2" />
              <span>
                <strong>Tổng đài:</strong> 1800 9075
              </span>
            </p>
            <p className="flex items-center">
              <FaClock className="w-4 h-4 text-yellow-300 mr-2" />
              <span>
                <strong>Thời gian khám bệnh:</strong> 07:00 - 12:00 | 13:00 - 16:00
              </span>
            </p>
            <p className="flex items-center">
              <FaMapMarkerAlt className="w-4 h-4 text-yellow-300 mr-2" />
              <span>
                <strong>Địa chỉ:</strong> 68E Phạm Hùng, Phường 9, TP Vĩnh Long, Tỉnh Vĩnh Long
              </span>
            </p>
            <p className="flex items-center">
              <FaHospital className="w-4 h-4 text-yellow-300 mr-2" />
              <span>
                <strong>Bệnh viện Đa khoa Xuyên Á - Vĩnh Long</strong>
              </span>
            </p>
          </div>
          <div className="space-y-2">
            {/* Bản đồ nhỏ + Click mở tab mới */}
            <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
              <div className="mt-3 w-full h-60 border rounded-lg overflow-hidden cursor-pointer hover:opacity-90">
                <iframe
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.0139769642276!2d105.9405192!3d10.2605328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a82e2287c14a1%3A0x393eb9e8762987d3!2zQsOqbmggduG7i2VuIMSRYSBrb2EgWHV54buBbiBMacOgbmc!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </a>
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
