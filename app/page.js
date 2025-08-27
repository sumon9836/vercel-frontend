
'use client'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://mainline.proxy.rlwy.net:35640"

  const fetchSessions = async () => {
    try {
      setError(null)
      const res = await fetch(`${apiUrl}/sessions`)
      const data = await res.json()
      setSessions(data || [])
    } catch (err) {
      console.error(err)
      setError('Failed to fetch sessions')
    } finally {
      setLoading(false)
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
      setError('Failed to logout user')
    }
  }

  const getStatusBadge = (status) => {
    const statusClass = status === 'active' ? 'status-active' : 'status-inactive'
    return (
      <span className={`status-badge ${statusClass}`}>
        {status}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="glass-card text-center">
        <div className="loading-spinner mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold">Loading sessions...</h2>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="glass-card">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gradient">📊 Active Sessions</h1>
          <button
            onClick={fetchSessions}
            className="action-button bg-blue-strong hover:bg-blue-600"
          >
            🔄 Refresh
          </button>
        </div>
        
        {error && (
          <div className="error-message mb-4">
            ⚠️ {error}
          </div>
        )}

        {sessions.length === 0 ? (
          <div className="empty-state">
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">No Active Sessions</h3>
            <p className="text-gray-600 mb-4">
              Start by pairing a new WhatsApp account to get started.
            </p>
            <a
              href="/pair"
              className="action-button bg-pink-strong hover:bg-pink-600"
            >
              ➕ Pair New Device
            </a>
          </div>
        ) : (
          <div className="sessions-grid">
            {sessions.map((s, idx) => (
              <div key={idx} className="session-card">
                <div className="session-header">
                  <h3 className="session-number">📞 {s.number}</h3>
                  {getStatusBadge(s.status)}
                </div>
                <div className="session-actions">
                  <button
                    onClick={() => logout(s.number)}
                    className="action-button bg-red-400 hover:bg-red-500"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="stats-card glass-card">
        <h2 className="text-xl font-semibold mb-4">📈 Statistics</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">{sessions.length}</div>
            <div className="stat-label">Total Sessions</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {sessions.filter(s => s.status === 'active').length}
            </div>
            <div className="stat-label">Active</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {sessions.filter(s => s.status !== 'active').length}
            </div>
            <div className="stat-label">Inactive</div>
          </div>
        </div>
      </div>
    </div>
  )
}
