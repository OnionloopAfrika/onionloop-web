"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
const page = () => {
  const router = useRouter()
  useEffect(() => (
    router.push('/aggregator/dashboard')
  ), [router])
  return (
    <div className="w-full h-screen"></div>
  )
}

export default page