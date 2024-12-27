import React from 'react';
import GroupFieldSpanWithText from "../../Data/InfoRecord/GroupFieldSpanWithText";
import Loading from "../../Info/Loading";
import Success from "../../Info/Success";
import Fail from "../../Info/Fail";

const PaymentModal = ({ 
  openModalResultPayment, 
  setOpenModalResultPayment, 
  payment, 
  gettingResultPayment }) => {
  const handleCloseModal = () => {
    setOpenModalResultPayment(false);
  };
  if (!openModalResultPayment) return null; // Không hiển thị nếu modal không mở
  if (gettingResultPayment) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75">
      <Loading />
    </div>
  );
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75">
      <div className="relative bg-white p-6 rounded-lg w-full md:w-[50%] h-full overflow-y-auto">
        <h2 className="text-xl font-semibold text-center mb-4 uppercase">Kết quả thanh toán</h2>
        <h1 className={`md:w-[100%] uppercase font-bold text-center ${payment.resultCode === 0 ? 'text-green-600' : 'text-red-600'}`}>{payment.message}</h1>
        {payment.resultCode === 0 || payment.resultCode === 9000 ? <Success /> : <Fail />}
        <div className="mb-4">
          <GroupFieldSpanWithText
            fields={[
              { fieldName: 'Mã giao dịch', fieldValue: payment.orderId, divCss: `md:w-[50%] md:border-r break-all` },
              { fieldName: 'Số tiền thanh toán', fieldValue: Number(payment.amount).toLocaleString() + ' VNĐ', divCss: `md:w-[50%]` },
            ]}
            css={'mt-1'}
          />
          <GroupFieldSpanWithText
            fields={[
              { fieldName: 'Thông tin', fieldValue: payment.orderInfo, divCss: `md:w-[100%]` },
            ]}
            css={'mt-1'}
          />
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
