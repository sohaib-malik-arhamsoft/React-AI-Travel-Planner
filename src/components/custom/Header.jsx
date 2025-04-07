import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { ArrowRight, Map, Calendar, Compass, ChevronRight } from 'lucide-react';


function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = async (tokenInfo) => {
    await axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "application/json",
        },
      })
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  useEffect(() => {
    console.log("---user>>>", user);
  }, [user]);

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <section className="relative min-h-screen flex flex-col">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')",
            backgroundPosition: "center 30%",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Navbar */}
        <nav className="relative z-10 w-full p-4 flex justify-between items-center bg-transparent">
          <a href="/">
            <img src="/logo.svg" alt="Logo" className="h-10" />
          </a>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <a href="/my-trips" className="group">
                  <Button
                    variant="outline"
                    className="rounded-full bg-white/20 hover:bg-white/30 text-white border-white/50 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg"
                  >
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      My Trips
                    </span>
                  </Button>
                </a>

                <a href="/create-trip" className="group">
                  <Button
                    variant="outline"
                    className="rounded-full bg-white/20 hover:bg-white/30 text-white border-white/50 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg"
                  >
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      Create Trip
                    </span>
                  </Button>
                </a>

                <Popover>
                  <PopoverTrigger className="group">
                    <div className="relative">
                      <img
                        src={user?.picture}
                        className="h-10 w-10 rounded-full border-2 border-white/70 cursor-pointer transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg"
                        alt="User"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white/70"></div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 bg-white/90 backdrop-blur-md rounded-xl shadow-xl">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-3 p-2 border-b border-gray-200">
                        <img
                          src={user?.picture}
                          alt="Profile"
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-semibold">{user?.name}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          googleLogout();
                          localStorage.clear();
                          window.location.reload();
                        }}
                        className="w-full text-left p-2 hover:bg-gray-100 rounded-md transition-colors duration-200 flex items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Logout
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <Button
                onClick={() => setOpenDialog(true)}
                className="rounded-full bg-white/20 hover:bg-white/30 text-white border-white/50 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
              >
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg>
                  Sign In
                </span>
              </Button>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Discover the Open AI
          </h1>
          <p className="text-lg md:text-2xl font-light mt-4 max-w-2xl">
            Plan your perfect AI trip adventure with our curated routes and
            hidden gems.
          </p>

          <a href="/create-trip" className="group">
            <Button
              size="lg"
              className="rounded-full bg-white/20 hover:bg-white/30 text-white border-white/50 
               transition-all duration-300 ease-in-out 
               hover:scale-105 hover:shadow-lg 
               flex items-center gap-2 
               px-6 py-3 
               text-base
               mt-5"
            >
              <span className="flex items-center gap-2">
                <Compass className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                Start Planning Now
                <ArrowRight
                  className="ml-2 h-5 w-5 transition-transform duration-300 
                   group-hover:translate-x-1 
                   group-hover:scale-110"
                />
              </span>
            </Button>
          </a>

          <div className="mt-8">
            <p className="text-white/80 text-sm">
              Try popular destinations: Yosemite, Pacific Coast Highway, Blue
              Ridge Parkway
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Sign-In Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription className="flex flex-col items-center">
              <img src="/logo.svg" alt="Logo" className="h-12 mb-4" />
              <h2 className="font-bold text-lg">Sign In with Google</h2>
              <p className="text-center text-sm">
                Sign in to the App with Google authentication securely
              </p>
              <Button onClick={login} className="w-full mt-5 flex items-center gap-2">
                <FcGoogle className="w-7 h-7" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
          <DialogClose
            onClick={closeDialog}
            className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Header;
