"use client";
import React from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon, Search, User, ShoppingCart } from "lucide-react";

// Define an array of navigation items with paths
const navItems = [
  { title: "Home", path: "/" },
  { title: "Product", path: "/Product" },
  { title: "Service", path: "/service" },
];

export default function Navbar() {
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
            className={`text-white hover:text-lime-400 transition duration-150 ${
              item.title === "Home" ? "text-lime-400" : ""
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
        <button
          aria-label="User Profile"
          className="text-gray-300 hover:text-lime-400 transition duration-150"
        >
          <User />
        </button>
      </div>

      {/* Menu for small screens */}
      <Sheet>
        <SheetTrigger asChild>
          <button
            aria-label="Open Menu"
            className="md:hidden p-2 text-white"
          >
            <MenuIcon />
          </button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="p-6 bg-[#1d1d1d] text-white justify-center items-center"
        >
          <SheetHeader className="flex flex-col justify-center items-center mt-6 space-y-2">
            {/* Updated Logo */}
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
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
