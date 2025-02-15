// src/routes.js
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Info401 from "./pages/error/Info401";
import Info403 from "./pages/error/Info403";
import Info404 from "./pages/error/Info404";
import Info500 from "./pages/error/Info500";

import BedList from "./pages/category/bed/BedList";
import TreatmentFeeList from "./pages/data/treatmentFeeListVView/TreatmentFeeList";
import TreatmentFeeListNoLogin from "./pages/data/treatmentFeeListVView/TreatmentFeeListNoLogin";
import ResultPaymentThanhToan from "./pages/transaction/ResultPaymentThanhToan";
import ResultPaymentTamUng from "./pages/transaction/ResultPaymentTamUng";

import TransactionList from "./pages/data/transactionListVView/TransactionList";
import TransactionListNoLogin from "./pages/data/transactionListVView/TransactionListNoLogin";
import TransactionTTDetail from "./pages/data/transactionTTDetail/TransactionTTDetail";
import TransactionTTDetailNoLogin from "./pages/data/transactionTTDetail/TransactionTTDetailNoLogin";
import TransactionTamUng from "./pages/transaction/TransactionTamUng";
import DeviceGetOtpTreatmentFeeLise from "./pages/auth/DeviceGetOtpTreatmentFeeList";

import TreatmentBedRoomList from "./pages/data/treatmentBedRoomListVView.js/treatmentBedRoomList";

const routes = [
    { path: "/home", component: Home, public: true },
    { path: "/login", component: Login, public: true },

    // Category
    { path: "/bed", component: BedList, public: false },

    // Data
    { path: "/treatment-fee-list", component: TreatmentFeeList, public: false },
    { path: "/treatment-fee-list-no-login", component: TreatmentFeeListNoLogin, public: true },
    { path: "/result-payment-thanh-toan", component: ResultPaymentThanhToan, public: true },
    { path: "/result-payment-tam-ung", component: ResultPaymentTamUng, public: true },

    { path: "/transaction-list", component: TransactionList, public: false },
    { path: "/transaction-list-no-login", component: TransactionListNoLogin, public: true },
    { path: "/transaction-tt-detail", component: TransactionTTDetail, public: false },
    { path: "/transaction-tt-detail-no-login", component: TransactionTTDetailNoLogin, public: true },
    { path: "/transaction-tam-ung", component: TransactionTamUng, public: false },

    { path: "/treatment-bed-room-list", component: TreatmentBedRoomList, public: false },

    // OTP
    { path: "/device-get-otp-treatment-fee-list", component: DeviceGetOtpTreatmentFeeLise, public: false },

    // Trang thông tin lỗi
    { path: "/info-401", component: Info401, public: true },
    { path: "/info-403", component: Info403, public: true },
    { path: "/info-404", component: Info404, public: true },
    { path: "/info-500", component: Info500, public: true },

    // Nếu không khớp bất kì url nào trả về 404 
    { path: "*", component: Info404, public: true },
];

export default routes;
