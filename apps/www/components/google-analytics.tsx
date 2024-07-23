/* eslint-disable turbo/no-undeclared-env-vars */
"use client"

import { useEffect } from "react"
import { getAnalytics } from "firebase/analytics"
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GA_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_GA_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_GA_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_GA_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_GA_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_GA_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
}

export const GoogleAnalytics = () => {
  useEffect(() => {
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === "production") {
      if (firebaseConfig?.projectId) {
        const app = initializeApp(firebaseConfig)
        if (app.name && typeof window !== "undefined") {
          const analytics = getAnalytics(app)
        }
      }
    }
  }, [])
  return null
}
