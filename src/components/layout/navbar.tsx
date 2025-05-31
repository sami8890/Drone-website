"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon, Search, ShoppingCart, LogIn } from "lucide-react"
import { useUser, SignInButton, UserButton } from "@clerk/nextjs"
import { CartDropdown } from "../cart/cart-dropdown"
import { useCart } from "../cart/cart-provider"

const navItems = [
  { title: "Home", path: "/" },
  { title: "Products", path: "/Product" },
  { title: "Services", path: "/service" },
  // { title: "Accessories", path: "/accessories" },
  { title: "Support", path: "/support" },
  { title: "About", path: "/about" },
   
]

export default function Navbar() {
  const [showPopup, setShowPopup] = useState(false)
  const { state, dispatch } = useCart()
  const { isSignedIn,  } = useUser()

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showPopup])

  return (
    <>
      <div className="relative flex items-center justify-between px-8 py-3 bg-black text-white shadow-lg border-b border-lime-500/20">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-lime-400">X</span>
          <span className="text-xl font-semibold tracking-wide">DroneS</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden lg:flex space-x-6 text-sm font-medium">
          {navItems.slice(0, 6).map((item) => (
            <Link key={item.title} href={item.path} className="text-white hover:text-lime-400 transition duration-150">
              {item.title}
            </Link>
          ))}

          
        </div>

        {/* Search, Cart, and User Icons */}
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:flex items-center bg-gray-800 px-4 py-2 rounded-md shadow-inner border border-lime-500/20">
            <Search className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              aria-label="Search"
              className="bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none text-sm w-36"
            />
          </div>

          {/* Cart Button with Badge */}
          <button
            onClick={() => dispatch({ type: "TOGGLE_CART" })}
            aria-label="Cart"
            className="relative text-gray-300 hover:text-lime-400 transition duration-150"
          >
            <ShoppingCart className="w-6 h-6" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-lime-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>

          {/* Auth Section */}
          {isSignedIn ? (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                  userButtonPopoverCard: "bg-gray-900 border border-lime-500/20",
                  userButtonPopoverActionButton: "hover:bg-lime-500/10 text-white",
                },
              }}
            />
          ) : (
            <SignInButton mode="modal">
              <button
                aria-label="Sign In"
                className="text-gray-300 hover:text-lime-400 transition duration-150 flex items-center"
              >
                <LogIn className="mr-1" />
                Sign In
              </button>
            </SignInButton>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button aria-label="Open Menu" className="lg:hidden p-2 text-white">
              <MenuIcon />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="p-6 bg-[#1d1d1d] text-white justify-center items-center">
            <SheetHeader className="flex flex-col justify-center items-center mt-6 space-y-2 mb-36">
              <div className="flex items-center space-x-2">
                <span className="text-4xl font-bold text-lime-500">X</span>
                <span className="text-3xl font-semibold text-white">DroneS</span>
              </div>
            </SheetHeader>

            <nav className="flex flex-col justify-center items-center mt-16 space-y-6 text-lg">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.path}
                  className="block text-gray-300 hover:text-lime-400 transition duration-150"
                >
                  {item.title}
                </Link>
              ))}

              {/* Mobile Cart Button */}
              <button
                onClick={() => dispatch({ type: "TOGGLE_CART" })}
                className="flex items-center text-gray-300 hover:text-lime-400 transition duration-150"
              >
                <ShoppingCart className="mr-2" />
                Cart ({getTotalItems()})
              </button>

              {/* Mobile Auth */}
              {isSignedIn ? (
                <UserButton />
              ) : (
                <SignInButton mode="modal">
                  <button className="text-gray-300 hover:text-lime-400 transition duration-150 flex items-center">
                    <LogIn className="mr-2" />
                    Sign In
                  </button>
                </SignInButton>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Cart Dropdown */}
      <CartDropdown />
    </>
  )
}
