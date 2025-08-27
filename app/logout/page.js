
'use client'
import { useState } from 'react'

export default function LogoutPage() {
  const [number, setNumber] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api"

  const handleLogout = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${apiUrl}/delete?number=${number}`)
      const data = await res.json()
      setMessage(data.message || JSON.stringify(data))
      setShowConfirm(false)
      setNumber('')
    } catch (err) {
      console.error(err)
      setMessage('Failed to logout user')
    } finally {
      setLoading(false)
    }
  }

  const confirmLogout = () => {
    if (!number.trim()) {
      setMessage('Please enter a valid phone number')
      return
    }
    setShowConfirm(true)
  }

  return (
    <div className="space-y-6">
      <div className="glass-card">
        <h1 className="text-3xl font-bold text-gradient mb-6">🚪 Logout User</h1>
        
        <div className="form-section">
          <label className="form-label">
            📞 Phone Number
          </label>
          <div className="input-group">
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Enter phone number to logout"
              className="form-input"
              disabled={loading}
            />
            <button
              onClick={confirmLogout}
              disabled={loading || !number.trim()}
              className="action-button bg-red-400 hover:bg-red-500 disabled:opacity-50"
            >
              🚪 Logout User
            </button>
          </div>
        </div>

        {message && (
          <div className="success-message">
            ✅ {message}
          </div>
        )}

        {showConfirm && (
          <div className="confirmation-modal">
            <div className="modal-content">
              <h3 className="text-lg font-semibold mb-4">⚠️ Confirm Logout</h3>
              <p className="mb-6">
                Are you sure you want to logout user <strong>{number}</strong>?
                This action cannot be undone.
              </p>
              <div className="modal-actions">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="action-button bg-gray-400 hover:bg-gray-500 mr-3"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="action-button bg-red-400 hover:bg-red-500"
                >
                  {loading ? 'Logging out...' : 'Confirm Logout'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
