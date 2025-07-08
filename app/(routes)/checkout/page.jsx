"use client"
import GlobalApi from '@/app/utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { ArrowBigRight, Currency } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'

function page() {

  const [cartItem, setCartItem] = useState(0);
  const [jwt, setJwt] = useState(null);
  const [user, setUser] = useState(null);
  const [subTotal, setSubTotal] = useState(0);

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();

  const [totalAmount, setTotalAmount] = useState(0);





  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem('jwt');
      const userData = sessionStorage.getItem('user');
      setJwt(token);
      setUser(userData ? JSON.parse(userData) : null);

    }

  }, []);

  useEffect(() => {
    if (user && jwt) {
      getCartList();
    }
  }, [user, jwt]);

  const [cartItemList, setCartItemList] = useState([]);
  useEffect(() => {
    let total = 0;
    cartItemList.forEach(element => {
      total = total + element.amount;

    });
    setSubTotal(total);
  }, [cartItemList])


  const getCartList = async () => {
    const cartItem = await GlobalApi.getCartItem(user.id, jwt);
    const filteredItems = cartItem?.filter(item => item.publishedAt !== null);
    setCartItem(filteredItems.length);
    setCartItemList(filteredItems);
    console.log(filteredItems);

    console.log("update is done!")

  }

  const calculateTotalPrice = () => {
    const tax = subTotal * 0.09;
    const totalPrice = subTotal + 50.00 + tax;

    return totalPrice.toFixed(2);
  }

  useEffect(() => {
    const total = calculateTotalPrice();
    setTotalAmount(total);
  }, [subTotal]);


  return (
    <div>
      <div className='bg-red-400 text-yellow-850 text-2xl p-2 font-bold text-center' >Checkout</div>

      <div className='grid grid-cols-1 md:grid-cols-3 px-6  gap-4 '>
        <div className=' mt-10 col-span-2 px-10 mx-10 p-4 bg-slate-100 shadow rounded '>
          <h2 className='font-bold    text-3xl'> Billing Detail
          </h2>
          <div className='grid grid-cols-1 gap-4 mt-10  '>
            <div className='grid grid-cols-2  gap-10 '>
              <Input placeholder="Name" onChange={(e) => setUsername(e.target.value)} />
              <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='grid grid-cols-2 gap-10 '>
              <Input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
              <Input placeholder="Zip" onChange={(e) => setZip(e.target.value)} />
            </div>
            <div>
              <Input placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
            </div>

          </div>

        </div>

        <div className=' mt-10 border shadow rounded'>
          <h2 className='font-bold p-3 bg-slate-300  text-2xl'>Total Cart({cartItem})</h2>
          <div className='p-4 flex flex-col gap-4 '>
            <h2 className='flex font-bold justify-between '>Subtotal: <span>{subTotal.toFixed(2)}</span></h2>
            <hr></hr>
            <h2 className='flex justify-between '>Delivery: <span>$50.00</span></h2>
            <h2 className='flex justify-between '>Tax (9%): <span>${(subTotal * 0.09).toFixed(2)}</span></h2>
            <hr></hr>
            <h2 className='font-bold flex justify-between'>Total : <span>${totalAmount}</span></h2>
             {/* disabled={!(username && email && zip && address)} */}
            <Button >Payment <ArrowBigRight /></Button>
            {totalAmount > 0 && (
              <PayPalButtons
                style={{ layout: "horizontal" }}
                forceReRender={[totalAmount]} // Important to rerender on change
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalAmount, // Must be string formatted
                          currency_code: 'USD',
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  console.log(data)
                  return actions.order.capture().then((details) => {
                    alert(`Transaction completed by ${details.payer.name.given_name}`);
                    // Optionally clear cart or redirect
                  });
                }}
                onError={(err) => {
                  console.error("PayPal Checkout Error:", err);
                }}
              />
            )}


          </div>

        </div>
      </div>
    </div>
  )
}

export default page
