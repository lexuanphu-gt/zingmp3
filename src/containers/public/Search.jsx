import React from 'react';
import { Outlet } from 'react-router-dom';

const Search = () => {
    return (
        <div>
            <div className='flex items-center border-b border-gray-400 pl-[60px] py-2 mb-7'>
                <div className='border-r pr-6 border-gray-400 font-bold text-[24px]'>
                    Kết Quả Tìm Kiếm
                </div>
                <div className='pl-6 text-[14px] flex items-center gap-9 font-semibold cursor-pointer '>
                    <span className='hover:text-main-500'>TẤT CẢ</span>
                    <span className='hover:text-main-500'>BÀI HÁT</span>
                    <span className='hover:text-main-500'>PLAYLIST/ALBUM</span>
                </div>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};

export default Search;