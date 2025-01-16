import React, { useEffect, useState } from "react";
import Card from "../../components/common/Master/Card";
import GroupFieldSpanWithText from "../../components/common/Data/InfoRecord/GroupFieldSpanWithText";
import Success from "../../components/common/Info/Success";
import Fail from "../../components/common/Info/Fail";
const PaymentResultPage = () => {
    const [transactionData, setTransactionData] = useState({});

    useEffect(() => {
        // Lấy các tham số từ URL
        const queryParams = new URLSearchParams(window.location.search);
        // queryParams.forEach((value, key) => {
        //     console.log(`${key}: ${value}`);
        // });
        const data = {
            partnerCode: queryParams.get("partnerCode"),
            orderId: queryParams.get("orderId"),
            requestId: queryParams.get("requestId"),
            amount: queryParams.get("amount"),
            orderInfo: queryParams.get("orderInfo"),
            orderType: queryParams.get("orderType"),
            transId: queryParams.get("transId"),
            resultCode: queryParams.get("resultCode"),
            message: queryParams.get("message"),
            responseTime: queryParams.get("responseTime"),
            extraData: queryParams.get("extraData"),
        };

        setTransactionData(data);
    }, []);

    return (
        <div className={`flex justify-center gap-1 w-full p-2 min-h-screen`}>
            <div className="w-full md:w-[40%] p-2">
                {/* Phần điều khiển và lọc */}
                <Card>
                    <div className="min-h-[80vh]">
                        <h1 className={`text-lg uppercase font-semibold text-center m-1 ${transactionData.resultCode == 0 || transactionData.resultCode == 9000 ? 'text-green-600' : 'text-red-600'}`}>
                            {transactionData.resultCode == 0 || transactionData.resultCode == 9000 ? 'Thanh toán thành công' : 'Thanh toán không thành công'}
                        </h1>
                        {transactionData.resultCode == 0 || transactionData.resultCode == 9000 ? <Success /> : <Fail />}
                        <GroupFieldSpanWithText
                            fields={[
                                { fieldName: 'Mã giao dịch', fieldValue: transactionData.orderId },
                            ]}
                        />
                        <GroupFieldSpanWithText
                            fields={[
                                { fieldName: 'Số tiền thanh toán', fieldValue: Number(transactionData.amount).toLocaleString() + ' VNĐ' },
                            ]}
                            css={'mt-1'}
                        />
                        <GroupFieldSpanWithText
                            fields={[
                                { fieldName: 'Thông tin', fieldValue: transactionData.orderInfo },
                            ]}
                            css={'mt-1'}
                        />
                        <GroupFieldSpanWithText
                            fields={[
                                { fieldName: 'Thời gian', fieldValue: new Date(Number(transactionData.responseTime)).toLocaleString()},
                            ]}
                            css={'mt-1'}
                        />
                        <GroupFieldSpanWithText
                            fields={[
                                { fieldName: 'Kết quả', fieldValue: transactionData.message },
                            ]}
                            css={'mt-1'}
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PaymentResultPage;
