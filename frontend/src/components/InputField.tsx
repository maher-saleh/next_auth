'use client'

import { ChangeEvent } from 'react'

interface InputFieldProps {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
}

export default function InputField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}