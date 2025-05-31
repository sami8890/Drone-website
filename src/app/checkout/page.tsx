"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { useCart } from "@/components/cart/cart-provider"
import { CreditCard, Truck, Shield, ChevronRight, Check, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CheckoutPage() {
  const router = useRouter()
  const { state } = useCart()
  const { isSignedIn, user } = useUser()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  // Redirect if not logged in
  useEffect(() => {
    if (!isSignedIn) {
      router.push("/")
    }
  }, [isSignedIn, router])

  // Check if cart is empty
  useEffect(() => {
    if (state.items.length === 0 && !orderComplete) {
      router.push("/Product")
    }
  }, [state.items, router, orderComplete])

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => {
      const price = Number.parseFloat(item.price.replace("$", "").replace(",", ""))
      return total + price * item.quantity
    }, 0)
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setOrderComplete(true)
    setLoading(false)
  }

  if (!isSignedIn) {
    return null // Will redirect
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-black text-white">
        
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-lime-500/20 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 text-lime-400" />
            </div>
            <h1 className="text-4xl font-bold">Order Complete!</h1>
            <p className="text-gray-400 max-w-md mx-auto">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
            <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10 max-w-md mx-auto">
              <p className="text-gray-300 mb-2">Order Reference:</p>
              <p className="text-lime-400 font-mono text-lg font-bold">XD-{Math.floor(Math.random() * 1000000)}</p>
            </div>
            <div className="pt-8">
              <Link href="/Product">
                <button className="px-8 py-4 bg-gradient-to-r from-lime-500 to-lime-600 text-black font-bold rounded-xl hover:from-lime-600 hover:to-lime-700 transition-all">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
 

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Link href="/Product" className="inline-flex items-center text-lime-400 hover:text-lime-300 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Checkout</h1>
          <p className="text-gray-400">Welcome back, {user?.firstName}!</p>
          <div className="flex items-center justify-center space-x-4 mt-6">
            <div className={`flex items-center ${step >= 1 ? "text-lime-400" : "text-gray-500"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-lime-500/20 border border-lime-500/40" : "bg-gray-800 border border-gray-700"}`}
              >
                1
              </div>
              <span className="ml-2">Review</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <div className={`flex items-center ${step >= 2 ? "text-lime-400" : "text-gray-500"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-lime-500/20 border border-lime-500/40" : "bg-gray-800 border border-gray-700"}`}
              >
                2
              </div>
              <span className="ml-2">Payment</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <div className={`flex items-center ${step >= 3 ? "text-lime-400" : "text-gray-500"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-lime-500/20 border border-lime-500/40" : "bg-gray-800 border border-gray-700"}`}
              >
                3
              </div>
              <span className="ml-2">Confirm</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-8">
            {step === 1 && (
              <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
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
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{item.name}</h3>
                        <p className="text-gray-400">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-lime-400 font-bold">{item.price}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={() => setStep(2)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-lime-500 to-lime-600 text-black font-bold rounded-lg hover:from-lime-600 hover:to-lime-700 transition-all"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10">
                <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <CreditCard className="text-lime-400" />
                      <h3 className="text-lg font-medium">Card Information</h3>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Expiration Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">CVC</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Truck className="text-lime-400" />
                      <h3 className="text-lg font-medium">Shipping Information</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">First Name</label>
                        <input
                          type="text"
                          defaultValue={user?.firstName || ""}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Last Name</label>
                        <input
                          type="text"
                          defaultValue={user?.lastName || ""}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">Email</label>
                      <input
                        type="email"
                        defaultValue={user?.emailAddresses[0]?.emailAddress || ""}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">Address</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">City</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">State</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">ZIP</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-3 bg-gradient-to-r from-lime-500 to-lime-600 text-black font-bold rounded-lg hover:from-lime-600 hover:to-lime-700 transition-all"
                    >
                      Review Order
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === 3 && (
              <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10">
                <h2 className="text-2xl font-bold mb-6">Order Confirmation</h2>

                <div className="space-y-6">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h3 className="text-lg font-medium mb-3">Order Summary</h3>
                    <div className="space-y-2">
                      {state.items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span className="text-gray-300">
                            {item.name} x{item.quantity}
                          </span>
                          <span className="text-white">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h3 className="text-lg font-medium mb-3">Shipping</h3>
                    <p className="text-gray-300">Express Delivery (2-3 business days)</p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h3 className="text-lg font-medium mb-3">Payment</h3>
                    <div className="flex items-center">
                      <div className="bg-gray-800 rounded p-1 mr-3">
                        <CreditCard className="text-lime-400 w-5 h-5" />
                      </div>
                      <span className="text-gray-300">Card ending in •••• 3456</span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={loading}
                      className={`px-8 py-3 bg-gradient-to-r from-lime-500 to-lime-600 text-black font-bold rounded-lg transition-all ${
                        loading ? "opacity-70 cursor-not-allowed" : "hover:from-lime-600 hover:to-lime-700"
                      }`}
                    >
                      {loading ? "Processing..." : "Place Order"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Total */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Total</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-white">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax</span>
                  <span className="text-white">${(getTotalPrice() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-white/10 my-3 pt-3 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="text-lime-400 font-bold">${(getTotalPrice() * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center text-gray-300 text-sm">
                  <Shield className="w-4 h-4 text-lime-400 mr-2" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <Truck className="w-4 h-4 text-lime-400 mr-2" />
                  <span>Free shipping on orders over $100</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-medium mb-4">Need Help?</h3>
              <p className="text-gray-400 text-sm mb-4">
                Our customer service team is available 24/7 to assist you with any questions.
              </p>
              <Link href="#" className="text-lime-400 hover:text-lime-300 text-sm flex items-center">
                Contact Support
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
