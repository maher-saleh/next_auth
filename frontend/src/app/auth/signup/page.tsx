'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'
import InputField from '@/components/InputField'
import Button from '@/components/Button'
import { signupSchema } from '@/lib/schemas'
import { signupUser } from '@/lib/api'
import { z } from 'zod';

export default function SignupPage() {
  const [formData, setFormData] = useState({ email: '', name: '', password: '' })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      signupSchema.parse(formData)
      setErrors({})

      await signupUser(formData)
      toast.success('Account created successfully!')
      router.push('/auth/signin')
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {}
        err.errors.forEach((error: any) => {
          fieldErrors[error.path[0] as string] = error.message
        })
        setErrors(fieldErrors)
      } else {
        toast.error(err.message || 'Something went wrong')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Button type="submit">Sign Up</Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-indigo-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}