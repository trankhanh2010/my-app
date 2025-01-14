import api, { encodeParams } from '../api/api';
import config from "../../config";

// Dịch vụ để gọi API lấy danh sách 
const getAll = async (billCode) => {
  let param;
  const isDB = config.apiService.transactionTTDetailVView.typeGetApi === 'db';

  // Lấy dữ liệu từ DB
  if(isDB){
    param = {
      CommonParam: {
        GetAll: true,
        Elastic: false,
      },
      ApiData: {
        BillCode: billCode
      },
    };
  }

  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await api.get(`/api/v1/transaction-tt-detail-v-view?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};

export default {
  getAll,
};
