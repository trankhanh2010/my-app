import React from "react";
const page = () => {
    return (
        <section class="bg-white min-h-screen">
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div class="mx-auto max-w-screen-sm text-center">
                    <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 ">401</h1>
                    <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Thiếu thông tin xác thực.</p>
                    <p class="mb-4 text-lg font-light text-gray-500">Bạn cần đăng nhập để truy cập tài nguyên này! </p>
                    <a href="/login" class="inline-flex text-white bg-blue-600 hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">Nhấn vào đây để đăng nhập!</a>
                </div>
            </div>
        </section>
    );
};

export default page;
