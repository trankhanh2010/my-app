import api, { encodeParams } from '../api/api';
import apiNoAuth from "../api/apiNoAuth";

const getNoLoginAll = async (filter) => {
  // Nếu không có treatmentId, không gọi api
  if(filter.treatmentId == null) return;
  let param;
  // Lấy dữ liệu từ DB
    param = {
      CommonParam: {
        GetAll: true,
        Elastic: false,
      },
      ApiData: {
        IsDelete: 0,
        TreatmentId: filter.treatmentId,
        IsDeposit: filter.isDeposit,
        OrderBy: {
          ["createTime"]: "desc",  
        },
      },
    };
  // console.log(param)
  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await apiNoAuth.get(`/api/v1/deposit-req-list-v-view-no-login?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};
const getNoLoginById = async (id) => {
  let param;

  // Lấy dữ liệu từ DB
    param = {
      CommonParam: {
        GetAll: true,
        Elastic: false,
      },
      ApiData: {
        IsDeposit: 0
      },
    };

  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await apiNoAuth.get(`/api/v1/deposit-req-list-v-view-no-login/${id}?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};
export default {
  getNoLoginAll,
  getNoLoginById,
};
