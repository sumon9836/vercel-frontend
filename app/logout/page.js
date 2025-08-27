'use client'
import { useState } from 'react'

export default function LogoutPage() {
  const [number, setNumber] = useState('')
  const [message, setMessage] = useState('')

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://mainline.proxy.rlwy.net:35640"

  const handleLogout = async () => {
    try {
      const res = await fetch(`${apiUrl}/delete?number=${number}`)
      const data = await res.json()
      setMessage(data.message || JSON.stringify(data))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="glass-card">
      <h1 className="text-2xl font-bold mb-4">Logout User</h1>
      <div className="flex space-x-2">
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter number"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded bg-red-400 text-white hover:bg-red-500"
        >
          Logout
        </button>
      </div>
      {message && (
        <p className="mt-4 text-green-700">{message}</p>
      )}
    </div>
  )
}