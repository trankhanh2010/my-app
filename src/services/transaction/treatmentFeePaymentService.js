import api, { encodeParams } from '../api/api';
import apiNoAuth from "../api/apiNoAuth";

const getPaymentMoMoThanhToanQRCode = async (treatmentCode) => {
  let param;
  // Lấy dữ liệu từ DB
    param = {
      ApiData: {
        TreatmentCode: treatmentCode,
        TransactionTypeCode: "TT",
        PaymentMethod: "MoMo",
        PaymentOption: "ThanhToanQRCode",
      },
    };

  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await apiNoAuth.get(`/api/v1/treatment-fee-payment?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};

const getPaymentMoMoThanhToanTheQuocTe = async (treatmentCode) => {
  let param;

  // Lấy dữ liệu từ DB
    param = {
      ApiData: {
        TreatmentCode: treatmentCode,
        TransactionTypeCode: "TT",
        PaymentMethod: "MoMo",
        PaymentOption: "ThanhToanTheQuocTe",
      },
    };

  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await apiNoAuth.get(`/api/v1/treatment-fee-payment?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};

const getPaymentMoMoThanhToanTheATMNoiDia = async (treatmentCode) => {
  let param;

  // Lấy dữ liệu từ DB
    param = {
      ApiData: {
        TreatmentCode: treatmentCode,
        TransactionTypeCode: "TT",
        PaymentMethod: "MoMo",
        PaymentOption: "ThanhToanTheATMNoiDia",
      },
    };

  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await apiNoAuth.get(`/api/v1/treatment-fee-payment?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};



const getPaymentMoMoTamUngQRCode = async (treatmentCode) => {
  let param;
  // Lấy dữ liệu từ DB
    param = {
      ApiData: {
        TreatmentCode: treatmentCode,
        TransactionTypeCode: "TU",
        PaymentMethod: "MoMo",
        PaymentOption: "ThanhToanQRCode",
      },
    };

  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await apiNoAuth.get(`/api/v1/treatment-fee-payment?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};

const getPaymentMoMoTamUngTheQuocTe = async (treatmentCode) => {
  let param;

  // Lấy dữ liệu từ DB
    param = {
      ApiData: {
        TreatmentCode: treatmentCode,
        TransactionTypeCode: "TU",
        PaymentMethod: "MoMo",
        PaymentOption: "ThanhToanTheQuocTe",
      },
    };

  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await apiNoAuth.get(`/api/v1/treatment-fee-payment?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};

const getPaymentMoMoTamUngTheATMNoiDia = async (treatmentCode) => {
  let param;

  // Lấy dữ liệu từ DB
    param = {
      ApiData: {
        TreatmentCode: treatmentCode,
        TransactionTypeCode: "TU",
        PaymentMethod: "MoMo",
        PaymentOption: "ThanhToanTheATMNoiDia",
      },
    };

  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await apiNoAuth.get(`/api/v1/treatment-fee-payment?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};
export default {
  getPaymentMoMoThanhToanQRCode,
  getPaymentMoMoThanhToanTheQuocTe,
  getPaymentMoMoThanhToanTheATMNoiDia,
  getPaymentMoMoTamUngQRCode,
  getPaymentMoMoTamUngTheQuocTe,
  getPaymentMoMoTamUngTheATMNoiDia,
};
