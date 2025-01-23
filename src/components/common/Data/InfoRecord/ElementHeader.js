import React from 'react';

const SectionHeader = ({ title }) => {
    return (
        <div className="w-full min-h-8 h-auto bg-gradient-to-r  text-black shadow-md grid place-items-start">
            <div className="text-sm font-semibold mx-2 my-auto uppercase">
                {title}
            </div>
        </div>
    );
};

export default SectionHeader;
