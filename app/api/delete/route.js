
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const number = searchParams.get('number')
    
    const backendUrl = process.env.BACKEND_URL || "https://mainline.proxy.rlwy.net:35640"
    const response = await fetch(`${backendUrl}/delete?number=${number}`)
    const data = await response.json()
    
    return Response.json(data)
  } catch (error) {
    console.error('Delete API error:', error)
    return Response.json({ error: 'Failed to delete session' }, { status: 500 })
  }
}
