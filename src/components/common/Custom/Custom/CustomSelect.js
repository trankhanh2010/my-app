import React, { useState, useRef, useEffect } from 'react';
import SpanFieldName from "../../Data/InfoRecord/SpanFieldName";

const CustomSelect = ({
    options,
    name,
    value,
    onChange,
    onInputChange,
    isClearable = false,
    placeholder = "Chọn một giá trị",
    error = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const dropdownRef = useRef(null); // Tham chiếu đến phần tử bao quanh dropdown

    const handleOptionClick = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        onInputChange(e.target.value);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false); // Đóng dropdown nếu nhấn ra ngoài
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div ref={dropdownRef} className="relative w-full"> {/* Thêm ref */}
            <SpanFieldName
                fieldName={name}
                fieldValue={value?.label || ""} // Kiểm tra nếu value là null
            />
            <div
                className={`border ${error ? 'border-red-500' : 'border-gray-300'} bg-gray-100 p-2 rounded`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {value ? value.label : <span className="text-gray-400">{placeholder}</span>}
            </div>
            {isOpen && (
                <div className="absolute w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Tìm kiếm..."
                        className="w-full p-2 border-b border-gray-300"
                    />
                    {filteredOptions.map((option) => (
                        <div
                            key={option.value}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleOptionClick(option)}
                            dangerouslySetInnerHTML={{ __html: option.label }}
                        />
                    ))}
                </div>
            )}
            {isClearable && value && (
                <button
                    onClick={() => {
                        onChange(null); // Đặt giá trị về null
                        setInputValue(''); // Xóa giá trị trong input
                    }}
                    className="absolute right-2 bottom-2 text-gray-500 hover:text-gray-700"
                >
                    X
                </button>
            )}
        </div>
    );
};

export default CustomSelect;
