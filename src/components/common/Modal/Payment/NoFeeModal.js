import React from 'react';
const PaymentModal = ({ 
  openModalNoFee, 
  setOpenModalNoFee, 
}) => {
  const handleCloseModal = () => {
    setOpenModalNoFee(false);
  };

  if (!openModalNoFee) return null; // Không hiển thị nếu modal không mở

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75">
      <div className="relative bg-white p-6 rounded-lg w-full md:w-[40%] h-full overflow-y-auto">
        <h2 className="text-xl font-semibold text-center mb-4 uppercase">Không có phí cần thanh toán</h2>
        <h3 className="font-bold text-center mb-4 uppercase">Vui lòng tải lại trang</h3>
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
