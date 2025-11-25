function getTokenFromLocalStorage(): string | null {
  const tokenAuth = localStorage.getItem('token')
  if (!tokenAuth) return null

  const jwtPayload = parseJwt(tokenAuth)
  const isExpired = jwtPayload.exp < Date.now() / 1000

  return !isExpired ? tokenAuth : null
}

function parseJwt(token: string) {
  const base64Url = token.split('.')[1] ?? ''
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  )

  return JSON.parse(jsonPayload)
}

export { getTokenFromLocalStorage, parseJwt }
