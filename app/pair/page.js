
'use client'
import { useState } from 'react'

export default function PairPage() {
  const [number, setNumber] = useState('')
  const [code, setCode] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://mainline.proxy.rlwy.net:35640"

  const handlePair = async () => {
    if (!number.trim()) {
      setError('Please enter a valid phone number')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${apiUrl}/pair?number=${number}`)
      const data = await res.json()
      setCode(data.code || JSON.stringify(data))
    } catch (err) {
      console.error(err)
      setError('Failed to generate pairing code')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="space-y-6">
      <div className="glass-card">
        <h1 className="text-3xl font-bold text-gradient mb-6">📱 Pair New Device</h1>
        
        <div className="form-section">
          <label className="form-label">
            📞 Phone Number (with country code)
          </label>
          <div className="input-group">
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="e.g., 917003816486"
              className="form-input"
              disabled={loading}
            />
            <button
              onClick={handlePair}
              disabled={loading || !number.trim()}
              className="action-button bg-blue-strong hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="loading-spinner-sm mr-2"></div>
                  Generating...
                </>
              ) : (
                <>🔗 Get Code</>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {code && (
          <div className="code-section">
            <h3 className="text-lg font-semibold mb-3">🔐 Your Pairing Code</h3>
            <div className="code-display">
              <code className="code-text">{code}</code>
              <button
                onClick={copyToClipboard}
                className="copy-button"
                title="Copy to clipboard"
              >
                📋
              </button>
            </div>
            <div className="code-instructions">
              <h4 className="font-semibold mb-2">Instructions:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Open WhatsApp on your phone</li>
                <li>Go to Settings → Linked Devices</li>
                <li>Tap "Link a Device"</li>
                <li>Enter this pairing code</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
