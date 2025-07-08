import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CatList({catlist}) {
  return (
    <div className='mt-5 '> 
      <h2 className='text-2xl font-bold text-yellow-800'>List Of Popular Items</h2>
      <div className='mt-5  grid gap-3  grid-cols-2 sm:grid-col-3 md:grid-cols-5 lg:grid-cols-7  items-center '>
        {catlist.map((category,index)=>(
            <Link href={'/product-category/'+category.name} key={index} className='flex flex-col items-center bg-red-100 gap-2 p-4 rounded-2xl cursor-pointer group hover:bg-red-200'>
                <Image  src = {process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category.icon.url}
                width={50}
                height={50}
                alt='list of cat'
                unoptimized
                className='group-hover:scale-125  transition-all ease-in-out'
                />
                <h2 className='text-yellow-800'>{category.name}</h2>
            </Link>
        ))}
    </div>
    </div>
  )
}

export default CatList
