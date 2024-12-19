import React from 'react';
import Select from 'react-select';

const ReactSelectCustomUpdate = ({
  recordDetails,
  setRecordDetails,
  list,
  setListKeyword,
  listFieldName,
  recordFieldName,
  recordFieldId,
  errors,
  placeholder,
}) => {
  return (
    <Select
      options={list.map((item) => ({
        value: item.id,
        label: (
          <span
            dangerouslySetInnerHTML={{
              __html: item.highlight?.[listFieldName]
                ? item.highlight[listFieldName][0]
                : item[listFieldName], // Hiển thị highlight nếu có, không có thì hiển thị tên bình thường
            }}
          />
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
          backgroundColor: '#f3f4f6', // Màu nền của input
        }),
      }}
    />
  );
};

export default ReactSelectCustomUpdate;
