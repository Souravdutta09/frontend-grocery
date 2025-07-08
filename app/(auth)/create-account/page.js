"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import GlobalApi from '@/app/utils/GlobalApi'

import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Loader, Loader2Icon, LoaderIcon } from 'lucide-react'

function createAccount() {

    const [username,setUsername]=useState();
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const router = useRouter();
    const [loader,setLoader] = useState();

      useEffect(() => {
        const jwt = sessionStorage.getItem('jwt');
        if(jwt){
          router.push('/');
        }
    
      }, []);

    const onCreateAccount =()=>{
        setLoader(true);
        GlobalApi.registerUser(username,email,password).then(resp=>{
          sessionStorage.setItem('user',JSON.stringify(resp.data.user));
          sessionStorage.setItem('jwt',resp.data.jwt);
          router.push("/")
          toast("Account Created Successfully")
          setLoader(false);

        },(e)=>{
            console.log("error message is:",e)
           toast(e.response?.data?.error?.message);
           setLoader(false);
    })
    }

    

    return (
        <div className='flex  items-baseline justify-center text-center my-26 '>
            <div className='bg-slate-200 flex flex-col  p-10 items-center justify-center shadow-lg'>
                <Image src="/logo2.png"
                    height={300}
                    width={300}
                    alt='logo'
                />
                <div>
                    <h2 className='text-3xl font-bold text-amber-900'>Create Your Account</h2>
                    <h2 className='text-slate-600 mt-2'>Enter your Email and Password to create a new account</h2>
                </div>
                <div className='flex flex-col gap-3 w-full items-center justify-center mt-8'>
                    <Input className="bg-slate-300" placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input className="bg-slate-300" placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input className="bg-slate-300" type="password" placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button disabled={!(username && password && email)}   
                    onClick={()=>onCreateAccount()}
                    className="w-full mt-3 ">
                    {loader ? <LoaderIcon className='animate-spin '/> :    "Create Account"}
                    </Button>
                    <div>Already have an account?
                        <span className='text-blue-500'>
                            <Link href={'/sign-in'}> Sign-in here
                            </Link>
                        </span>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default createAccount
