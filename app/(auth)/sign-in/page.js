"use client"
import GlobalApi from '@/app/utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Check, CheckCircle, Cross, LoaderIcon, XCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'sonner'



function signIn() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  const onSignIn = () => {
    setLoader(true);
    GlobalApi.signInAccount(email, password).then(resp => {
      sessionStorage.setItem('jwt', resp.data.jwt);
      sessionStorage.setItem('user', JSON.stringify(resp.data.user));
      toast(
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-600 w-6 h-6" />
          <span>"Login Successfully!"</span>
        </div>
      );
      router.push('/');
      setLoader(false);


    }, (e) => {
      console.log("error message:", e)
      toast(
        <div className="flex items-center gap-2">
          <XCircle className="text-red-600 w-6 h-6" />
          <span>{e.response?.data?.error?.message}</span>
        </div>
      );
      setLoader(false);
    })
  }

  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      router.push('/');
    }
  }, []);



  return (
    <div className='flex  items-baseline justify-center text-center my-30 '>
      <div className='bg-slate-200 flex flex-col  p-10 items-center justify-center shadow-lg'>
        <Image src="/logo2.png"
          height={300}
          width={300}
          alt='logo'
        />
        <div>
          <h2 className='text-3xl font-bold text-amber-900'>Sign In your account</h2>
          <h2 className='text-slate-600 mt-2'>Enter your Email and Password to Sign In</h2>
        </div>
        <div className='flex flex-col gap-3 w-full items-center justify-center mt-8'>

          <Input className="bg-slate-300" placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input className="bg-slate-300" type="password" placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button disabled={!(password && email)}
            onClick={() => onSignIn()}
            className="w-full mt-3 ">
            {loader ? <LoaderIcon className="animate-spin" /> : " Sign In"}</Button>
          <div>Don't have an account?
            <span className='text-blue-500'>
              <Link href={'/create-account'}> Create new account here
              </Link>
            </span>

          </div>

        </div>

      </div>
    </div>
  )
}

export default signIn
