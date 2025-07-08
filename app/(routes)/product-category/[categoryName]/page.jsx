import React from 'react'
import TopCategoryList from '../_Components/TopCategoryList'
import GlobalApi from '@/app/utils/GlobalApi';
import ProductList from '@/app/_components/ProductList';

async function productCategroy({params}) {
    const catlist = await GlobalApi.getCategoryList();
    const productList = await GlobalApi.getProductsByCategory(params.categoryName);

  return (
    <div>

      <h2 className='text-3xl p-3 font-bold text-center bg-red-300 text-amber-950 '>{params.categoryName}</h2>

      <div className='px-16 '>

      <TopCategoryList catlist={catlist}
       selectedCategory={params.categoryName} />

      <ProductList productList={productList}/>
      </div>

    </div>
  )
}

export default productCategroy
