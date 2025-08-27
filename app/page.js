'use client'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [sessions, setSessions] = useState([])

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://mainline.proxy.rlwy.net:35640"

  const fetchSessions = async () => {
    try {
      const res = await fetch(`${apiUrl}/sessions`)
      const data = await res.json()
      setSessions(data || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchSessions()
    const interval = setInterval(fetchSessions, 5000)
    return () => clearInterval(interval)
  }, [])

  const logout = async (number) => {
    try {
      await fetch(`${apiUrl}/delete?number=${number}`)
      fetchSessions()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="glass-card">
      <h1 className="text-2xl font-bold mb-4">Active Sessions</h1>
      {sessions.length === 0 ? (
        <p>No active sessions</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-2">Number</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((s, idx) => (
              <tr key={idx} className="border-t border-[var(--glass-border)]">
                <td className="p-2">{s.number}</td>
                <td className="p-2">{s.status}</td>
                <td className="p-2">
                  <button
                    onClick={() => logout(s.number)}
                    className="px-3 py-1 rounded bg-red-400 hover:bg-red-500 text-white"
                  >
                    Logout
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}