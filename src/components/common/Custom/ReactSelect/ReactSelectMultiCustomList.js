import React, { useState } from 'react';
import Select from 'react-select';

const ReactSelectCustomUpdate = ({
  createOrUpdate,
  list,
  setListKeyword,
  listFieldName,
  listFieldCode,
  errors,
  placeholder,
  setListSelected,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const enhancedOptions = [
    { value: 'select_all', label: 'Chọn tất cả' }, // Thêm "Chọn tất cả"
    ...list.map((item) => ({
      value: item.id,
      // Hiện highlight nếu có, không thì hiện bình thường
      label: (
        <div className="flex items-center space-x-2">
          {/* Phần code */}
          <span className="min-w-[100px] text-left  text-gray-600"
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
            className="text-gray-800"
          />
        </div>
      ),
    })),
  ];

  const handleChange = (selected) => {
    const isSelectAllSelected = selected?.some((option) => option.value === 'select_all');

    if (isSelectAllSelected) {
      // Nếu "Chọn tất cả" được chọn
      if (selectedOptions.length === list.length) {
        // Bỏ chọn tất cả
        setSelectedOptions([]);
        setListSelected([]);
      } else {
        // Chọn tất cả các mục (trừ "Chọn tất cả")
        const allOptions = list.map((item) => ({
          value: item.id,
          label: item[listFieldName],
        }));
        setSelectedOptions(allOptions);
        setListSelected(allOptions.map((item) => item.value));
      }
    } else {
      // Xử lý chọn từng mục bình thường
      const selectedWithoutSelectAll = selected.filter(
        (option) => option.value !== 'select_all'
      );
      setSelectedOptions(selectedWithoutSelectAll);
      setListSelected(selectedWithoutSelectAll.map((option) => option.value));
    }
  };

  return (
    <Select
      isMulti
      options={enhancedOptions}
      value={selectedOptions}
      filterOption={() => true} // Tắt lọc tự động từ react-select
      onChange={handleChange}
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
        menuPortal: base => ({ ...base, zIndex: 200 }) // Đặt z index cao hơn các phần khác để k bị mất khi scroll
      }}
      menuPortalTarget={document.body} 
    />
  );
};

export default ReactSelectCustomUpdate;
