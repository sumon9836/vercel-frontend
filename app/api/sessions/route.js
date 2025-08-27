
export async function GET() {
  try {
    const backendUrl = process.env.BACKEND_URL || "https://mainline.proxy.rlwy.net:35640"
    const response = await fetch(`${backendUrl}/sessions`)
    const data = await response.json()
    
    return Response.json(data)
  } catch (error) {
    console.error('Sessions API error:', error)
    return Response.json({ error: 'Failed to fetch sessions' }, { status: 500 })
  }
}
