import Image from 'next/image'
import React from 'react'
import ProductItem from './ProductItem'

function ProductList({ productList }) {
    return (
        <div>
            <h2 className='text-2xl text-yellow-800 p-2 font-bold mt-10'>List Of Popular Products</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {productList.map((product, index) => index<=11&&(
                <div key={index}>
                    <ProductItem product={product} />
                </div>
            ))}
            </div>



        </div>
    )
}

export default ProductList
