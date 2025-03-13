import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const GetUserProfile = async (tokenInfo) => {
    await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'application/json'
        }
      }).then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      })
  };

  useEffect(() => {
    console.log("---user>>>", user);
  }, [user]);

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <div className='p-3 shadow-sm flex justify-between items-center px-5'>
        <div className='flex items-center'>
          <a href='/'>
          <img src='/logo.svg' alt='Logo' className='h-10 cursor-pointer' />
          </a>
        </div>
        {
          user ?
            <div className='flex items-center gap-3'>
               <a href='/create-trip'>
              <Button variant='outline' className='rounded-full'>+ Create Trip</Button>
               </a> 

               <a href='/my-trips'>
              <Button variant='outline' className='rounded-full'>My Trip</Button>
               </a>
              <Popover>
                <PopoverTrigger>
                  <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' />
                </PopoverTrigger>
                <PopoverContent>
                  <h2 className='cursor-pointer' onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}>Logout</h2>
                </PopoverContent>
              </Popover>

            </div>
            :
            <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        }
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                onClick={login}
                className='w-full mt-5'>
                <FcGoogle className='w-7 h-7' />
                Sign In with Google</Button>
            </DialogDescription>
          </DialogHeader>
          <DialogClose onClick={closeDialog} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Header;