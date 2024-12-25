import React, { useState } from "react";
import Loading from "../../Info/Loading";
import MoMoThanhToanQRCodeModal from "./MoMoThanhToanQRCodeModal";
import MoMoThanhToanTheQuocTeModal from "./MoMoThanhToanTheQuocTeModal";
import MoMoThanhToanTheATMNoiDiaModal from "./MoMoThanhToanTheATMNoiDiaModal";

const PaymentModal = ({
  creatingPayment,
  selectedRecord,
  opentShowAllPayment,
  setOpentShowAllPayment,
  openModalPaymentMoMoQRCode,
  setOpenModalPaymentMoMoQRCode,
  openModalPaymentMoMoTheQuocTe,
  setOpenModalPaymentMoMoTheQuocTe,
  openModalPaymentMoMoTheATMNoiDia,
  setOpenModalPaymentMoMoTheATMNoiDia,
  getPaymentMoMoQRCode,
  getPaymentMoMoTheQuocTe,
  getPaymentMoMoTheATMNoiDia,
  payment,
  handleOpenMoMoPayment,
}) => {
  const [showMoMoOptions, setShowMoMoOptions] = useState(false);
  const [showVNPayOptions, setShowVNPayOptions] = useState(false);

  const handleCloseModal = () => {
    setOpentShowAllPayment(false);
  };
  // Nếu đang đợi api lấy link thanh toán thì khóa thao tác
  if (creatingPayment) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75">
      <Loading />
    </div>
  );
  if (!opentShowAllPayment) return null; // Không hiển thị nếu modal không mở

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75">
      <div className="relative bg-white p-6 rounded-lg w-full md:w-[40%]">
        <h2 className="text-xl font-semibold text-center mb-4 uppercase">
          Chọn hình thức thanh toán
        </h2>

        {/* Nút thanh toán MoMo */}
        <button
          onClick={() => {
            setShowMoMoOptions(!showMoMoOptions);
            setShowVNPayOptions(false); // Đóng VNPay khi mở MoMo
          }}
          className="mb-3 w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500"
        >
          Thanh toán MoMo
        </button>

        {/* Phương thức thanh toán MoMo */}
        {showMoMoOptions && (
          <div className="bg-gray-100 p-3 rounded-lg mb-3">
            <p className="text-sm font-bold text-gray-700 mb-2">Chọn phương thức thanh toán:</p>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => getPaymentMoMoQRCode(selectedRecord.treatmentCode)}
                  className="w-full rounded-md bg-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500"
                >
                  Thanh toán qua mã QR MoMo
                </button>
              </li>
              <li>
                <button
                  onClick={() => getPaymentMoMoTheQuocTe(selectedRecord.treatmentCode)}
                  className="w-full rounded-md bg-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500"
                >
                  Thanh toán qua thẻ quốc tế
                </button>
              </li>
              <li>
                <button
                  onClick={() => getPaymentMoMoTheATMNoiDia(selectedRecord.treatmentCode)}
                  className="w-full rounded-md bg-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500"
                >
                  Thanh toán qua thẻ ATM nội địa
                </button>
              </li>
            </ul>
          </div>
        )}

        {/* Nút thanh toán VNPay */}
        <button
          onClick={() => {
            setShowVNPayOptions(!showVNPayOptions);
            setShowMoMoOptions(false); // Đóng MoMo khi mở VNPay
          }}
          className="mb-3 w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
        >
          Thanh toán VNPay
        </button>

        {/* Phương thức thanh toán VNPay */}
        {showVNPayOptions && (
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-700 mb-2 font-bold">Chọn phương thức thanh toán:</p>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => alert("Thanh toán qua QR VNPay")}
                  className="w-full rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                >
                  Thanh toán qua mã QR VNPay
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert("Thanh toán qua thẻ ngân hàng")}
                  className="w-full rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                >
                  Thanh toán qua thẻ ATM nội địa
                </button>
              </li>
            </ul>
          </div>
        )}

        {/* Nút đóng modal */}
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <MoMoThanhToanQRCodeModal
        openModalPaymentMoMoQRCode={openModalPaymentMoMoQRCode}
        setOpenModalPaymentMoMoQRCode={setOpenModalPaymentMoMoQRCode}
        payment={payment}
        handleOpenMoMoPayment={handleOpenMoMoPayment}
      />
      <MoMoThanhToanTheQuocTeModal
        openModalPaymentMoMoTheQuocTe={openModalPaymentMoMoTheQuocTe}
        setOpenModalPaymentMoMoTheQuocTe={setOpenModalPaymentMoMoTheQuocTe}
        payment={payment}
      />
      <MoMoThanhToanTheATMNoiDiaModal
        openModalPaymentMoMoTheATMNoiDia={openModalPaymentMoMoTheATMNoiDia}
        setOpenModalPaymentMoMoTheATMNoiDia={setOpenModalPaymentMoMoTheATMNoiDia}
        payment={payment}
      />
    </div>
  );
};

export default PaymentModal;
