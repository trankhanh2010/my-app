import React from "react";

const ModalConfirmUpdate = ({ isOpen, onConfirm, onCancel, message, changes }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full h-full md:w-auto md:h-auto md:min-w-[50%] max-w-screen max-h-screen p-4 overflow-auto">
                <div className="text-center">
                    <svg
                        className="mx-auto mb-4 text-gray-400 w-12 h-12"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-700">{`Bạn chắc chắn muốn cập nhật bản ghi ${message} ?`}</h3>
                    <div className="text-left mb-4">
                        <ul className="list-disc pl-5">
                            {changes && changes.length > 0 ? (
                                <ul className="list-disc pl-5">
                                    {changes.map((change, index) => (
                                        <li key={index} className="mb-2 border-b">
                                            <span className="font-semibold">{change.field}:</span>{" "}
                                            <span className="text-gray-500">
                                                từ <span className="text-red-500">{change.oldValue}</span> thành{" "}
                                                <span className="text-green-500">{change.newValue}</span>
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">Không có thay đổi nào.</p>
                            )}
                        </ul>
                    </div>
                    <button
                        onClick={onConfirm}
                        className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 mr-2"
                    >
                        Có
                    </button>
                    <button
                        onClick={onCancel}
                        className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Không
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmUpdate;
