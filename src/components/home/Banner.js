import React from 'react';

const Component = () => (
    <div className="grid grid-cols-subgrid md:grid-cols-12 grid-row-12 gap-2">
    <h1 className="text-2xl font-bold tracking-wide md:col-span-3 md:col-start-3 md:border-r-2 border-orange-200 border-b-4 md:border-b-0 pb-2 md:pb-0 md:pr-2">
      <img
        src="\image\logo\logo-bvxa-with-text.PNG"
        alt="Logo"
        className="w-full h-auto md:h-[50px] lg:h-[60px] xl:h-[70px] 2xl:h-[80px] object-contain"
      />
    </h1>
    <div className="text-2xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl md:col-span-5 text-blue-900 font-semibold text-center md:text-left">
      <p className="uppercase md:whitespace-nowrap">Bệnh viện đa khoa xuyên á</p>
      <p className="text-sm md:whitespace-nowrap md:text-md lg:text-xl xl:text-2xl 2xl:text-3xl">Sức khỏe của bạn là hạnh phúc của chúng tôi</p>
    </div>
  </div>
);

export default Component;
