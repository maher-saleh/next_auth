'use client'

interface ButtonProps {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  className?: string
}

export default function Button({
  children,
  type = 'button',
  onClick,
  className = 'bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700',
}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={`w-full ${className}`}>
      {children}
    </button>
  )
}