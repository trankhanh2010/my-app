import api, { encodeParams } from '../api/api';
import apiNoAuth from "../api/apiNoAuth";
import config from "../../config";

// Dịch vụ để gọi API lấy danh sách 
const getFormattedDate = () => {
  const now = new Date();
  
  // Lấy năm, tháng, ngày, giờ, phút, giây
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng từ 0-11, cần cộng thêm 1
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  // Kết hợp lại theo định dạng YYYYMMDDHHMMSS
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

const formattedDate = getFormattedDate();
const getCusor = async (lastId = 0, limit = 20, filter) => {
  let param;
  const isDB = config.apiService.testServiceReqListVView.typeGetApi === 'db';
  // Lấy dữ liệu từ DB
  if(isDB){
    param = {
      CommonParam: {
        CursorPaginate: true,
        LastId: lastId,
        Limit: limit,
        Elastic: false,
      },
      ApiData: {
        IsDelete: 0,
        FromTime: Number(filter.fromTime),
        ToTime:   Number(filter.toTime),
        ExecuteDepartmentCode: "XN",
        IsSpecimen: null,
        IsNoExcute: null,
        
        TreatmentCode: filter.treatmentCode,
        PatientCode: filter.patientCode,

        OrderBy: {
          ["id"]: "asc",  
        },
      },
    };
  }
  // console.log(param)
  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await api.get(`/api/v1/test-service-req-list-v-view?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};

const getById = async (id) => {
  let param;
  // Lấy dữ liệu từ DB
    param = {
      CommonParam: {
        Elastic: false,
      },
      ApiData: {
        IsActive: 1
      },
    };

  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await apiNoAuth.get(`/api/v1/test-service-req-list-v-view/${id}?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};

const getNoLoginCursor = async (lastId = 0, limit = 20, filter) => {
  let param;
    param = {
      CommonParam: {
        CursorPaginate: true,
        LastId: lastId,
        Limit: limit,
        Elastic: false,
      },
      ApiData: {        
        TreatmentCode: filter.treatmentCode,
        PatientCode: filter.patientCode,

        OrderBy: {
          ["id"]: "asc",  
        },
      }
  }
  // console.log(param)
  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await apiNoAuth.get(`/api/v1/test-service-req-list-v-view-no-login?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};
export default {
  getCusor,
  getById,
  getNoLoginCursor,
};
