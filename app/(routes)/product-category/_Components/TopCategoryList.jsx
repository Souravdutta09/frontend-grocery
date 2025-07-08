import GlobalApi from '@/app/utils/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

async function TopCategoryList({ catlist, selectedCategory }) {


    return (
        <div>
            <div className='mt-5 flex gap-3  overflow-auto mx-7 md:mx-30 '>
                {catlist.map((category, index) => (
                    <Link href={'/product-category/' + category.name} key={index} className={`flex flex-col items-center bg-red-100 gap-2 p-4 rounded-2xl cursor-pointer group hover:bg-red-200
            w-[150px] min-w-[100px]
        ${selectedCategory == category.name && 'bg-red-400'}
    `}>
                        <Image src={category.icon?.formats?.thumbnail?.url ||
                            category.icon?.formats?.small?.url ||
                            category.icon?.url ||
                            "/fallback.png"}
                            width={50}
                            height={50}
                            alt='list of cat'
                            unoptimized
                            className='group-hover:scale-125  transition-all ease-in-out w-[60%] '
                        />
                        <h2 className={`group-hover:text-yellow-900 ${selectedCategory === category.name && 'text-white'}`}>
                            {category.name}
                        </h2>

                    </Link>
                ))}
            </div>
        </div>
    )
}

export default TopCategoryList
