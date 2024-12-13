import api, { encodeParams } from '../api/api';
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
        FromTime: 20221229000000,
        ToTime:   20221229235959,
        ExecuteDepartmentCode: "XN",
        IsSpecimen: true,
        IsNoExcute: false,
        
        OrderBy: {
          ["id"]: "asc",  
        },
      },
    };
  }

  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await api.get(`/api/v1/test-service-req-list-v-view?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};

export default {
  getCusor,
};
