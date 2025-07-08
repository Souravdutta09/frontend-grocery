"use client"
import { Button } from '@/components/ui/button'
import { CircleUserIcon, LayoutGrid, Search, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import GobalApi from '../utils/GlobalApi'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import GlobalApi from '../utils/GlobalApi'
import { UpdateCartContext } from '../_context/UpdateCartContext'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import CartItemList from './CartItemList'
import { toast } from 'sonner'

function Navbar() {
    const router = useRouter()

    const [CategoryList, setCategoryList] = useState([]);
    const [login, setLogin] = useState(false);
    const [cartItem, setCartItem] = useState(0);
    const [jwt, setJwt] = useState(null);
    const [user, setUser] = useState(null);
    const [subTotal, setSubTotal] = useState(0);


    const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
    const [cartItemList, setCartItemList] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem('jwt');
        setLogin(!!token);
    }, []);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = sessionStorage.getItem('jwt');
            const userData = sessionStorage.getItem('user');
            setJwt(token);
            setUser(userData ? JSON.parse(userData) : null);
            setLogin(!!token);
        }

        getCategoryList();
    }, []);

    useEffect(() => {
        if (user && jwt) {
            getCartList();
        }
    }, [user, jwt, updateCart]);



    const getCategoryList = () => {
        GobalApi.getCategory().then(resp => {
            console.log("category list is:", resp.data.data)
            console.log("category url is :", resp.icon?.url)

            setCategoryList(resp.data.data)
        })
    }

    const getCartList = async () => {
        const cartItem = await GlobalApi.getCartItem(user.id, jwt);
        const filteredItems = cartItem?.filter(item => item.publishedAt !== null);
        setCartItem(filteredItems.length);
        setCartItemList(filteredItems);
        console.log(filteredItems);

        console.log("update is done!")

    }
    const onSignOut = () => {
        sessionStorage.clear();
        router.push('/sign-in');
    }

    const onDeleteCart = async (id) => {
        console.log("Attempting to delete item with ID:", id);

        try {
            const resp = await GlobalApi.deleteCartItem(id, jwt);
            console.log("Delete response:", resp.status, resp.data);

            toast("Item deleted!");

            await getCartList();  // Ensure the UI refreshes
        } catch (err) {
            console.error("Delete failed:", err.response?.status, err.response?.data || err.message);
            toast.error("Failed to delete item: " + (err.response?.data?.message || err.message));
        }
    };

    useEffect(() => {
        let total = 0;
        cartItemList.forEach(element => {
            total = total + element.amount;

        });
        setSubTotal(total.toFixed(2));
    }, [cartItemList])


    return (
        <div className=' shadow-sm p-3 flex items-center justify-between' >
            <div className='flex items-center gap-5' >
                <div className='m-2 px-4'>
                    <Link href={"/"}                >
                        <Image src="/logo2.png"
                            width={230}
                            height={200}
                            alt="picture of logo" />
                    </Link>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger  >  <h2 className=' hidden md:flex gap-2 border rounded-full p-2 px-8 items-center bg-red-200 cursor-pointer'>
                        <LayoutGrid />
                        Category
                    </h2></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {CategoryList.map((category, index) => (
                            <Link key={index} href={'/product-category/' + category.name}>
                                <DropdownMenuItem key={category.id || index}
                                    className="flex gap-4 items-center">
                                    <Image
                                        src={category.icon?.formats?.thumbnail?.url ||
                                            category.icon?.formats?.small?.url ||
                                            category.icon?.url ||
                                            "/fallback.png"}
                                        alt={category?.name}
                                        width={30}
                                        height={30}
                                        unoptimized
                                    />
                                    <h2 className='text-lg '>{category?.name}</h2>
                                </DropdownMenuItem>
                            </Link>

                        ))}

                    </DropdownMenuContent>
                </DropdownMenu>

                <div className='md:flex gap-3 rounded-full px-6   p-2 border hidden '>
                    <Search />
                    <input type="text" placeholder='Search'
                        className='outline-none' />
                </div>
            </div>

            <div className='   flex gap-4 px-4'>

                <Sheet>
                    <SheetTrigger asChild>
                        <h2 className='flex gap-2 items-center '>
                            <ShoppingBag className='text-black  size-7' />
                            <span className="bg-red-300 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center text-md">
                                {cartItem}
                            </span>
                        </h2>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle className="text-lg bg-red-300 font-bold p-4 ">My Cart</SheetTitle>

                            <CartItemList cartItemList={cartItemList}
                                onDeleteCart={onDeleteCart} />
                            <SheetDescription>
                            </SheetDescription>
                        </SheetHeader>
                        <SheetClose asChild >
                            <div className='absolute flex flex-col items-center gap-3 bottom-6 w-full px-4'>
                                <h2 className='text-lg font-bold flex justify-between w-full'>Subtotal <span>${subTotal}</span></h2>
                                <Button className='w-full'
                                    disabled={subTotal == 0}
                                    onClick={() => router.push(jwt ? '/checkout' : '/sign-in')}
                                >CheckOut</Button> {/* Optional width control */}
                            </div>

                        </SheetClose>
                    </SheetContent>
                </Sheet>



                {!login ?
                    <Link href={'/sign-in'} >
                        <Button>Login</Button>
                    </Link> : (<DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <CircleUserIcon className='h-10 w-10 p-2 rounded-full text-black bg-red-300' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push('/my-orders')}>
                                My Orders</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onSignOut()}>SignOut</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>)
                }
            </div>

        </div>
    )
}

export default Navbar
