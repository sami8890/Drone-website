"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react"
import { useCart } from "./cart-provider"
import { useUser, SignInButton } from "@clerk/nextjs"

export const CartDropdown: React.FC = () => {
  const { state, dispatch } = useCart()
  const { isSignedIn } = useUser()

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: "REMOVE_ITEM", payload: id })
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
    }
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => {
      const price = Number.parseFloat(item.price.replace("$", "").replace(",", ""))
      return total + price * item.quantity
    }, 0)
  }

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  if (!state.isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={() => dispatch({ type: "TOGGLE_CART" })}
      />

      {/* Cart Dropdown */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-black border-l border-lime-500/20 shadow-2xl z-50 transform transition-transform duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-lime-500/20">
            <h2 className="text-xl font-bold text-white flex items-center">
              <ShoppingBag className="w-5 h-5 mr-2 text-lime-400" />
              Cart ({getTotalItems()})
            </h2>
            <button
              onClick={() => dispatch({ type: "TOGGLE_CART" })}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">Your cart is empty</p>
                <Link
                  href="/Product"
                  onClick={() => dispatch({ type: "TOGGLE_CART" })}
                  className="inline-block px-6 py-3 bg-gradient-to-r from-lime-500 to-lime-600 text-black font-semibold rounded-lg hover:from-lime-600 hover:to-lime-700 transition-all"
                >
                  Shop Now
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-contain rounded-md"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">{item.name}</h3>
                      <p className="text-lime-400 font-bold">{item.price}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-lime-500/20 p-6 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-white">Total:</span>
                <span className="text-lime-400">${getTotalPrice().toFixed(2)}</span>
              </div>

              <div className="space-y-3">
                {/* Check if user is logged in */}
                {isSignedIn ? (
                  <Link href="/checkout">
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-lime-500 to-lime-600 text-black font-bold rounded-lg hover:from-lime-600 hover:to-lime-700 transition-all">
                      Checkout
                    </button>
                  </Link>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-center">
                      <p className="text-yellow-400 mb-2">Please sign in to checkout</p>
                      <SignInButton mode="modal">
                        <button
                          onClick={() => dispatch({ type: "TOGGLE_CART" })}
                          className="px-6 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg transition-colors"
                        >
                          Sign In
                        </button>
                      </SignInButton>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => dispatch({ type: "CLEAR_CART" })}
                  className="w-full px-6 py-3 border border-red-500/50 text-red-400 font-medium rounded-lg hover:bg-red-500/10 transition-all"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
