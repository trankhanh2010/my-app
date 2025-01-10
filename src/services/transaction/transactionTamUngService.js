import api, { encodeParams } from '../api/api';
import config from "../../config";

const create = async (dataCreate) => {
  try {
      const response = await api.post(`/api/v1/transaction-tam-ung`, dataCreate, {
          headers: {
              "Content-Type": "application/json",
          },
      });
      return response.data; // Trả về dữ liệu từ API
  } catch (error) {
      console.error("Lỗi khi tạo giao dịch tạm ứng:", error);
      throw error; // Ném lỗi để xử lý ở cấp cao hơn
  }
};

export default {
  create,
};
