import api, { encodeParams } from '../api/api';
import apiNoAuth from "../api/apiNoAuth";

const getPaymentMoMoQRCode = async (treatmentCode) => {
  let param;
  // Lấy dữ liệu từ DB
    param = {
      ApiData: {
        TreatmentCode: treatmentCode,
        PaymentMethod: "MoMo",
        PaymentOption: "ThanhToanQRCode",
      },
    };

  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await apiNoAuth.get(`/api/v1/service-req-payment?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};

const getPaymentMoMoTheQuocTe = async (treatmentCode) => {
  let param;

  // Lấy dữ liệu từ DB
    param = {
      ApiData: {
        TreatmentCode: treatmentCode,
        PaymentMethod: "MoMo",
        PaymentOption: "ThanhToanTheQuocTe",
      },
    };

  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await apiNoAuth.get(`/api/v1/service-req-payment?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};

const getPaymentMoMoTheATMNoiDia = async (treatmentCode) => {
  let param;

  // Lấy dữ liệu từ DB
    param = {
      ApiData: {
        TreatmentCode: treatmentCode,
        PaymentMethod: "MoMo",
        PaymentOption: "ThanhToanTheATMNoiDia",
      },
    };

  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await apiNoAuth.get(`/api/v1/service-req-payment?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};

export default {
  getPaymentMoMoQRCode,
  getPaymentMoMoTheQuocTe,
  getPaymentMoMoTheATMNoiDia,
};
