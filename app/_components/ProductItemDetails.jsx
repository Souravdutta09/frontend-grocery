"use client"
import { Button } from '@/components/ui/button'
import { LoaderCircle, ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import GlobalApi from '../utils/GlobalApi'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { UpdateCartContext } from '../_context/UpdateCartContext'

function ProductItemDetails({ product }) {
    const jwt = sessionStorage.getItem('jwt');
    const user =JSON.parse( sessionStorage.getItem('user'));
    
    const [productTotalQuantity, setProductTotalQuantity] = useState(
        product.sellingPrice ?
        product.sellingPrice :
        product.mrp
    );

    const [quantity, setQuantity] = useState(1);
    const router = useRouter();
    const [loader,setLoader]=useState(false);

    const {updateCart,setUpdateCart} = useContext(UpdateCartContext);

    const addToCart =()=>{
        setLoader(true);
        if(!jwt){
            router.push('/sign-in');
            return ;
            setLoader(false)
        }
        const data = {
            data:{
                quantity:quantity,
                amount:(quantity * productTotalQuantity).toFixed(2),
                products:product.id,
                users_permissions_user:user.id,
                actuals:product.id,
                userId:user.id
            }
        }
        GlobalApi.addToCart(data,jwt).then(resp=>{
            console.log(resp);
            console.log(product.id)
            console.log("user id",user.id)
            toast("✅ Added to the Cart");
            setUpdateCart(!updateCart);
            setLoader(false);

        },(e)=>{
            toast("❌ Error while adding to the cart");
            console.log("error is :",e)
            setLoader(false);
        })
    }


    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 bg-white text-black'>
            <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                (product.image?.[0].formats?.thumbnail?.url || product.image?.[0]?.url || '')}
                width={300}
                height={300}
                quality={100}
                alt="product image"
                className=' h-[300px] w-[200px] md:h-[300px] md:w-[300px] object-contain bg-slate-200  '
            />

            <div className='flex flex-col gap-4 '>
                <h2 className='text-3xl font-bold '>{product.name}</h2>
                <div className='flex gap-3 '>
                    {
                        product.sellingPrice &&
                        <h2 className='text-3xl font-bold '>${product.sellingPrice}</h2>
                    }
                    <h2 className={`text-3xl font-bold ${product.sellingPrice && 'line-through text-gray-500'} `}>${product.mrp}</h2>
                </div>
                <div>
                    <h2 className='font-xl '>Quantity ({product.itemQuantityType})</h2>
                </div>
                <div className='flex flex-col gap-5 items-baseline' >
                    <div className='flex gap-3 items-center justify-center '>

                        <div className='flex items-center gap-5 md:gap-8 p-2 border  border-black px-4 rounded-lg font-bold'>
                            <button disabled={quantity == 1} onClick={() => setQuantity(quantity - 1)}>-</button>
                            <h2>{quantity}</h2>
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <h2 className='font-bold text-2xl items-center'>= ${(quantity * productTotalQuantity).toFixed(2)}</h2>

                    </div>
                    <Button className="flex gap-3" onClick ={()=>addToCart()}
                        disabled={loader}>
                        <ShoppingBasket />
                        {loader?<LoaderCircle className='animate-spin'/>:"Add to Cart"}
                    </Button>
                </div>

                <h2 ><span className='font-bold'>Category:</span> {product.categories?.[0]?.name}</h2>
            </div>
        </div>
    )
}

export default ProductItemDetails
