import api, { encodeParams } from '../api/api';
import config from "../../config";

// Dịch vụ để gọi API lấy danh sách 
const getAllSelect = async (patientId) => {
  let param;
  const isDB = config.apiService.testServiceTypeListVView.typeGetApi === 'db';

  // Lấy dữ liệu từ DB
  if(isDB){
    param = {
      CommonParam: {
        GetAll: true,
        Elastic: false,
      },
      ApiData: {
        PatientId: patientId
      },
    };
  }

  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await api.get(`/api/v1/test-service-type-list-v-view?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};

export default {
  getAllSelect,
};
