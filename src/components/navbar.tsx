"use client"
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
    { title: "Support", path: "/Support" },
];


export default function Navbar() {
    return (
        <div className="relative flex items-center justify-between px-8 py-3 bg-black text-white shadow-lg">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-lime-400">X</span>
                <span className="text-xl font-semibold tracking-wide">DroneS</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8 text-sm font-medium">
                {navItems.map((item) => (
                    <Link
                        key={item.title}
                        href={item.path}
                        className="text-gray-300 hover:text-lime-400 transition duration-150"
                    >
                        <span className={`${item.title === "Home" ? "text-lime-400" : ""}`}>
                            {item.title}
                        </span>
                    </Link>
                ))}
            </div>

            {/* Search, Cart, and User Icons */}
            <div className="flex items-center space-x-4">
                {/* Search bar */}
                <div className="relative hidden md:flex items-center bg-gray-800 px-4 py-2 rounded-md shadow-inner mr-4">
                    <Search className="text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none text-sm"
                        style={{ width: "150px" }} // Fixed width for consistency
                    />
                </div>

                {/* Cart and User icons */}
                <ShoppingCart className="text-gray-300 hover:text-lime-400 transition duration-150" />
                <User className="text-gray-300 hover:text-lime-400 transition duration-150" />
            </div>

            {/* Menu for small screens */}
            <Sheet>
                <SheetTrigger asChild>
                    <button className="md:hidden p-2 text-gray-300">
                        <MenuIcon />
                    </button>
                </SheetTrigger>

                <SheetContent side="right" className="p-6 bg-black text-white">
                    <SheetHeader className="flex justify-between items-center">
                        <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
                    </SheetHeader>

                    <nav className="mt-6 space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.title}
                                href={item.path}
                                className="block text-gray-300 hover:text-lime-400"
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
