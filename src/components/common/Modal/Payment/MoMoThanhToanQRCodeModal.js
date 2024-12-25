import React from 'react';
import QRCode from 'react-qr-code';
import GroupFieldSpanWithText from "../../Data/InfoRecord/GroupFieldSpanWithText";

const PaymentModal = ({ 
  openModalPaymentMoMoQRCode, 
  setOpenModalPaymentMoMoQRCode, 
  payment, 
  handleOpenMoMoPayment
}) => {
  const handleCloseModal = () => {
    setOpenModalPaymentMoMoQRCode(false);
  };

  if (!openModalPaymentMoMoQRCode) return null; // Không hiển thị nếu modal không mở

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75">
      <div className="relative bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold text-center mb-4 uppercase">Thanh toán MoMo</h2>
        <h3 className="font-bold text-center mb-4 uppercase">Phương thức thanh toán mã QR</h3>
        <div className="mb-4">
            <GroupFieldSpanWithText 
                fields={[
                    {fieldName:'Mã giao dịch', fieldValue:payment.orderId, divCss:`md:w-[50%] md:border-r`},
                    {fieldName:'Số tiền thanh toán', fieldValue:Number(payment.amount).toLocaleString()+' VNĐ', divCss:`md:w-[50%]`},
                ]}
            />
            <GroupFieldSpanWithText 
                fields={[
                    {fieldName:'Thông tin', fieldValue:payment.orderInfo, divCss:`md:w-[100%]`},
                ]}
                css={'mt-1'}
            />
          <p className="mt-1 text-center">Quét mã QR để thanh toán:</p>
          <div className="flex justify-center">
            <QRCode value={payment.qrCodeUrl} />
          </div>
        </div>
        <div className="mb-1 item-center text-center py-2 px-4 rounded bg-green-600 hover:bg-green-500 mt-1 text-white">
          <a href={payment.payUrl} target="_blank" rel="noopener noreferrer"  
            className=""
          >
          Nhấp vào đây để mở link thanh toán
          </a>
        </div>
        <div className="mb-4 item-center text-center">
          <button  
            className="py-2 px-4 rounded bg-pink-600 hover:bg-pink-500 mt-1 mb-1 text-white w-full"
            onClick={handleOpenMoMoPayment}
          >
          Thanh toán bằng MoMo
          </button>
        </div>
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
