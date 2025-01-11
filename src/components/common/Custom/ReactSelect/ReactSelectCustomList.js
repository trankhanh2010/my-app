import React from 'react';
import Select from 'react-select';
import Loading from "../../Info/Loading"

const ReactSelectCustomUpdate = ({
  createOrUpdate,
  recordDetails,
  setRecordDetails,
  list,
  setListKeyword,
  listFieldName,
  listFieldCode,
  recordFieldName,
  recordFieldCode,
  recordFieldId,
  errors,
  placeholder,
  loading,
}) => {
  return (
    <Select
      // Đang đợi api thì hiện đang xử lý, không cho chọn
      options={
        loading ? [{ value: '', label: <Loading/>, isDisabled: true }] : list.map((item) => ({
        value: item.id,
        // Hiện highlight nếu có, không thì hiện bình thường
        label: (
          <div className="flex items-center space-x-2">
            {/* Phần code */}
            <span className="min-w-[80px] text-left"
              dangerouslySetInnerHTML={{
                __html: item.highlight?.[listFieldCode]
                  ? item.highlight[listFieldCode][0]
                  : item[listFieldCode] || "",
              }}
            />
            {/* Phần name */}
            <span
              dangerouslySetInnerHTML={{
                __html: item.highlight?.[listFieldName]
                  ? item.highlight[listFieldName][0]
                  : item[listFieldName] || "",
              }}
            />
          </div>
        ),
      }))}
      value={
        recordDetails?.[recordFieldId]
          ? {
              value: recordDetails[recordFieldId],
              label:
                list.find((item) => item.id === recordDetails[recordFieldId])?.[listFieldName] ||
                '',
            }
          : null
      }
      filterOption={() => true} // Tắt lọc tự động từ react-select
      onChange={(selectedOption) => {
        const selectedItem = list.find((item) => item.id === selectedOption?.value);
        setRecordDetails({
          ...recordDetails,
          [recordFieldId]: selectedOption?.value,
          [recordFieldName]: selectedItem ? selectedItem[listFieldName] : '', // Cập nhật giá trị khi chọn
          [recordFieldCode]: selectedItem ? selectedItem[listFieldCode] : '', // Cập nhật giá trị khi chọn
        });
      }}
      onInputChange={(inputValue) => {
        setListKeyword(inputValue); // Cập nhật từ khóa tìm kiếm khi người dùng nhập
      }}
      isClearable
      placeholder={placeholder}
      className="w-full"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: errors ? '#ef4444' : base.borderColor, // Màu viền đỏ khi có lỗi
          backgroundColor: `${createOrUpdate ? '#f3f4f6' : ""}`, // Màu nền của input
        }),
        menuPortal: base => ({ ...base, zIndex: 200 }), // Đặt z index cao hơn các phần khác để k bị mất khi scroll
        menu: (base) => ({
          ...base,
          pointerEvents: loading ? 'none' : 'auto', // Vô hiệu hóa chuột khi loading
        }),
      }}  
      menuPortalTarget={document.body} 
    />
  );
};

export default ReactSelectCustomUpdate;
