import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function CartItemList({ cartItemList, onDeleteCart }) {
 


  return (
    <div className='h-[500px] overflow-auto '>
      <div className='flex flex-col gap-3 mt-5  '>
        {cartItemList.map((item) => (
          <div key={item.id} className='flex justify-between items-center mb-5 '>
            <div className='flex gap-5  items-center  ' >
              <Image
                src={
                  item.image
                    ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${item.image}`
                    : "/fallback.png" // your public fallback image
                }
                width={80}
                height={80}
                alt={item.name || "Product"}
                className="border p-2"
                onError={(e) => {
                  // Optional: fallback at runtime
                  e.currentTarget.src = "/fallback.png";
                }}
              />


              <div className=''>
                <h2 className=' font-bold '>{item.name} </h2>
                <h2>Quantity:{item.quantity}</h2>
                <h2 className='text-lg font-bold'>${item.amount}</h2>
              </div>
            </div>
            <div>
              <TrashIcon className='text-red-800 cursor-pointer ' onClick={() => onDeleteCart(item.id)} />

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default CartItemList;
