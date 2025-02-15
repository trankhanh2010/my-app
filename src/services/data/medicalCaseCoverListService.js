import api, { encodeParams } from '../api/api';

// Dịch vụ để gọi API lấy danh sách 


const getId = async (id) => {
  if(!id) return 
  let param;
  // Lấy dữ liệu từ DB
    param = {
      CommonParam: {
        Elastic: false,
      },
      ApiData: {
        IsActive: 1,
        IsDelete: 0,
      },
    };
  // console.log(param)
  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await api.get(`/api/v1/medical-case-cover-list-v-view/${id}?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};


export default {
  getId,
};
