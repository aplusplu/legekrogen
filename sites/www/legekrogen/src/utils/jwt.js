// Decodare JWT payload fără dependențe externe
export function decodeJwt(token) {
  if (!token || typeof token !== "string") return {};
  const parts = token.split(".");
  if (parts.length < 2) return {};

  const b64 = parts[1]
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(parts[1].length / 4) * 4, "=");

  try {
    const raw = atob(b64);
    // transformă în UTF-8 safe
    const utf8 = decodeURIComponent(
      raw
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(utf8);
  } catch {
    return {};
  }
}
