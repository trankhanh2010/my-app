import apiNoAuth from "../api/apiNoAuth";
import axios from "axios";

const ipnNofityThanhToan = async (data) => {
  try {
      // const response = await apiNoAuth.post(`/api/v1/momo-notify-thanh-toan`, data, {
      //     headers: {
      //         "Content-Type": "application/json",
      //     },
      // });


      // Test ở local
      const response = await axios.post(`https://580e-115-77-108-114.ngrok-free.app/api/v1/momo-notify-thanh-toan`, data, {
        headers: {
            "Content-Type": "application/json",
            },
      });
      return response; // Trả về dữ liệu từ API
  } catch (error) {
      console.error("Thông tin không hợp lệ hoặc lỗi thanh toán:", error);
      throw error; // Ném lỗi để xử lý ở cấp cao hơn
  }
};


export default {
  ipnNofityThanhToan,
};
