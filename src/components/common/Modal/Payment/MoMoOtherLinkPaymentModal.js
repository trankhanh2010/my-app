import React from 'react';
import GroupFieldSpanWithText from "../../Data/InfoRecord/GroupFieldSpanWithText";
import SpinWattingUserPayment from "../../Info/SpinWattingUserPayment";
const PaymentModal = ({ 
  openModalOtherLinkPayment, 
  setOpenModalOtherLinkPayment,
  payment, 
}) => {
  const handleCloseModal = () => {
    setOpenModalOtherLinkPayment(false);
  };

  if (!openModalOtherLinkPayment) return null; // Không hiển thị nếu modal không mở
  if (!payment.payUrl) return null; // Không hiển thị nếu không có phí cần thanh toán => k có payUrl

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75">
      <div className="relative bg-white p-6 rounded-lg w-full md:w-[40%] h-full md:h-auto overflow-y-auto">
        <h2 className="text-xl font-semibold text-center mb-4 uppercase">Thông báo</h2>
        <h3 className="font-bold text-center mb-4 uppercase">Đang tồn tại giao dịch với phương thức khác</h3>
        <SpinWattingUserPayment mess='Đang chờ thao tác của người dùng...'/>
        <div className="mb-4 text-sm">
          Bạn đã tạo 1 giao dịch mà <span className='text-red-600 font-semibold'>chưa hoàn tất thanh toán</span>! 
          Để <span className='text-blue-600 font-semibold'>tiếp tục quá trình thanh toán</span> bạn phải:   
          <ul class="list-disc ml-6">
              <li>Hoặc <a href={payment.payUrl} target="_blank">
                <span className='text-red-600 font-semibold hover:underline'>hủy giao dịch trước đó </span>
                </a>(<span className='italic'>nhấn nút <span className='text-pink-500 not-italic font-semibold'>Quay về</span> phía dưới thời gian hết hạn đơn hàng trong trang thanh toán MOMO</span>)
                <img src="\image\momo\huy-thanh-toan.PNG" className='h-auto w-auto mx-auto'></img>
              </li>
              <li>Hoặc <a href={payment.payUrl} target="_blank"><span className='text-blue-600 font-semibold hover:underline'>tiếp tục thanh toán</span></a> giao dịch đó!</li>
          </ul>
        </div>
        <div className="">
          <a href={payment.payUrl} target="_blank" rel="noopener noreferrer"  
            className="mb-1 item-center text-center py-2 px-4 rounded bg-green-600 hover:bg-green-500 mt-1 text-white block">
          Nhấp vào đây để mở link thanh toán
          </a>
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
