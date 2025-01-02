import api, { encodeParams } from '../api/api';
import apiNoAuth from "../api/apiNoAuth";
import config from "../../config";

// Dịch vụ để gọi API lấy danh sách 
const getAllSelect = async (treatmentId) => {
  let param;

  // Lấy dữ liệu từ DB
    param = {
      CommonParam: {
        Elastic: false,
      },
      ApiData: {
        TreatmentId: treatmentId
      },
    };

  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await apiNoAuth.get(`/api/v1/treatment-fee-detail-v-view?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};

export default {
  getAllSelect,
};
