'use client'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function ApplicationPage() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    toast.success('Logged out successfully!')
    router.push('/auth/signin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Application</h1>
        <p className="text-gray-600 mb-6">You are successfully signed in!</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  )
}