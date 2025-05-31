"use client"

import type React from "react"

import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#84cc16",
          colorBackground: "#000000",
          colorInputBackground: "#1f2937",
          colorInputText: "#ffffff",
        },
        elements: {
          formButtonPrimary: "bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700",
          card: "bg-gradient-to-br from-gray-900 to-black border border-lime-500/20",
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}
