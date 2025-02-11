import React from "react";
const page = () => {
    return (
        <section className="bg-white min-h-screen">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 ">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Trang không tồn tại.</p>
                    <p className="mb-4 text-lg font-light text-gray-500">Vui lòng kiểm tra lại đường dẫn! </p>
                </div>
            </div>
        </section>
    );
};

export default page;
