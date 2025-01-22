import React from 'react';

const SectionHeader = ({ title }) => {
    return (
        <div className="w-full min-h-8 h-auto bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-md grid place-items-center">
            <div className="text-sm font-semibold mx-2">
                {title}
            </div>
        </div>
    );
};

export default SectionHeader;
