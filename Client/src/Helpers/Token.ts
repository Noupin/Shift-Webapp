export function isTokenExpired(token: string) {
  const body = JSON.parse(atob(token.split('.')[1]));
  const now = Date.now() / 1000;
  const expiry = body.iat + body.exp;

  return now < expiry;
}
