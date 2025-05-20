import toast from 'react-hot-toast'

export async function signupUser(data: { email: string; name: string; password: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message)
  }

  return res.json()
}

export async function signinUser(data: { email: string; password: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message)
  }

  return res.json()
}

export async function getUserProfile(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message)
  }

  return res.json()
}