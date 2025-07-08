import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ProductItemDetails from './ProductItemDetails';

function ProductItem({ product }) {
    return (
        <div className='p-2 md:p-6 gap-3 mt-6 border rounded-lg  flex flex-col items-center justify-center
        hover:scale-105 hover:shadow-lg transition-all ease-in-out cursor-pointer '>

            <Image src={
                (product.image?.[0].formats?.thumbnail?.url || product.image?.[0]?.url || '')}
                width={200}
                height={200}
                quality={100}
                alt="product image"
                className='h-[200px] w-[200px] object-contain '
            />

            <h2 className='text-lg font-bold '>{product.name}</h2>
            <div className='flex gap-3 '>
                {
                    product.sellingPrice &&
                    <h2 className='text-lg font-bold '>${product.sellingPrice}</h2>
                }
                <h2 className={`text-lg font-bold ${product.sellingPrice && 'line-through text-gray-500'} `}>${product.mrp}</h2>
            </div>


            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="text-yellow-900 bg-red-200 hover:bg-red-400">Add to Cart</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>

                        </DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                            <ProductItemDetails product={product} />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ProductItem;
