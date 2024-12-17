"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  MenuIcon,
  Search,
  User,
  ShoppingCart,
  LogIn,
  LogOut,
} from "lucide-react";
import { useUser, useClerk } from "@clerk/clerk-react";

const navItems = [
  { title: "Home", path: "/" },
  { title: "Product", path: "/Product" },
  { title: "Service", path: "/service" },
];

export default function Navbar() {
  const { user } = useUser();
  const { openSignIn, signOut } = useClerk();
  const [showPopup, setShowPopup] = useState(false);

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      openSignIn();
      setShowPopup(true);
    }
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="relative flex items-center justify-between px-8 py-3 bg-black text-white shadow-lg">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-lime-400">X</span>
        <span className="text-xl font-semibold tracking-wide">DroneS</span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8 text-sm font-medium">
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={item.path}
            className={`text-white hover:text-lime-400 transition duration-150 ${item.title === "Home" ? "text-lime-400" : ""
              }`}
          >
            {item.title}
          </Link>
        ))}
      </div>

      {/* Search, Cart, and User Icons */}
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:flex items-center bg-gray-800 px-4 py-2 rounded-md shadow-inner">
          <Search className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            aria-label="Search"
            className="bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none text-sm w-36"
          />
        </div>

        <button
          aria-label="Cart"
          className="text-gray-300 hover:text-lime-400 transition duration-150"
        >
          <ShoppingCart />
        </button>

        {/* Auth and Profile Options */}
        {user ? (
          <div className="relative group">
            <button
              aria-label="Profile Menu"
              className="text-gray-300 hover:text-lime-400 transition duration-150 flex items-center"
            >
              <User className="mr-1" />
              {user.firstName}
            </button>
            {/* Dropdown Menu */}
            <div
              className="absolute right-0 hidden group-hover:block group-focus-within:block bg-gray-800 text-white rounded-md shadow-lg mt-4 z-20"
              tabIndex={0}
            >
              <Link
                href="/dashboard"
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="block px-4 py-2 hover:bg-gray-700 w-full text-left"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleAuthAction}
            aria-label="Sign In"
            className="text-gray-300 hover:text-lime-400 transition duration-150 flex items-center"
          >
            <LogIn className="mr-1" />
            Sign In
          </button>
        )}
      </div>

      {/* Popup Notification */}
      {showPopup && (
        <div className="absolute top-16 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          You have logged in!
        </div>
      )}

      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <button aria-label="Open Menu" className="md:hidden p-2 text-white">
            <MenuIcon />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="p-6 bg-[#1d1d1d] text-white justify-center items-center"
        >
          <SheetHeader className="flex flex-col justify-center items-center mt-6 space-y-2 mb-36">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <span className="text-4xl font-bold text-green-500">X</span>
              <span className="text-3xl font-semibold text-white">DroneS</span>
            </div>
          </SheetHeader>

          {/* Navigation Links */}
          <nav className="flex flex-col justify-center items-center mt-16 space-y-6 text-lg">
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.path}
                className="block text-gray-300 hover:text-green-400 transition duration-150"
              >
                {item.title}
              </Link>
            ))}

            {/* Auth Button */}
            <button
              onClick={handleAuthAction}
              className="text-gray-300 hover:text-green-400 transition duration-150 flex items-center"
            >
              {user ? (
                <>
                  <LogOut className="mr-2" />
                  Sign Out
                </>
              ) : (
                <>
                  <LogIn className="mr-2" />
                  Sign In
                </>
              )}
            </button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
