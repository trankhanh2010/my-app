import axios from 'axios';
import CryptoJS from 'crypto-js';

// Dịch vụ để gọi API lấy danh sách giường bệnh
const getBeds = async (start, limit, orderBy, orderDirection) => {
  const token = '1a7ee9193800e2389325ead5365c7c5191a1b87615eff6e30d22306e1af99e61';

  const param = {
    CommonParam: {
      Start: start,
      Limit: limit,
      Elastic: false,
    },
    ApiData: {
      OrderBy: {
        [orderBy]: orderDirection,  // Thay đổi tùy theo trường và hướng người dùng chọn
      },
    },
  };

  const paramBase64 = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(JSON.stringify(param))
  );

  try {
    const response = await axios.get(
      `http://laravel-api.test/api/v1/bed?param=${paramBase64}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};

export default {
  getBeds,
};
