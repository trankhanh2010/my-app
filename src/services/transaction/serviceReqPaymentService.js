import api, { encodeParams } from '../api/api';

const getPayment = async (treatmentCode) => {
  let param;

  // Lấy dữ liệu từ DB
    param = {
      ApiData: {
        TreatmentCode: treatmentCode
      },
    };

  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await api.get(`/api/v1/service-req-payment?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};

export default {
  getPayment,
};
