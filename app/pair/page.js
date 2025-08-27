'use client'
import { useState } from 'react'

export default function PairPage() {
  const [number, setNumber] = useState('')
  const [code, setCode] = useState(null)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://mainline.proxy.rlwy.net:35640"

  const handlePair = async () => {
    try {
      const res = await fetch(`${apiUrl}/pair?number=${number}`)
      const data = await res.json()
      setCode(data.code || JSON.stringify(data))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="glass-card">
      <h1 className="text-2xl font-bold mb-4">Pair New User</h1>
      <div className="flex space-x-2">
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter number (e.g., 917003816486)"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handlePair}
          className="px-4 py-2 rounded bg-[var(--blue-strong)] text-white hover:opacity-80"
        >
          Get Code
        </button>
      </div>
      {code && (
        <div className="mt-4 p-4 bg-white rounded shadow">
          <p className="font-mono text-lg">{code}</p>
        </div>
      )}
    </div>
  )
}