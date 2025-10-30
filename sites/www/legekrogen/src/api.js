export const api = async (
  path,
  { method = "GET", data, token, isForm } = {}
) => {
  const opts = { method, headers: {} };
  if (token) opts.headers.Authorization = `Bearer ${token}`;
  if (data) {
    if (isForm) opts.body = data;
    else {
      opts.headers["Content-Type"] = "application/json";
      opts.body = JSON.stringify(data);
    }
  }
  // folosim proxy Vite: toate merg la /api
  const url = path.startsWith("/")
    ? `/api${path}`.replace("//api", "/api")
    : `/api/${path}`;
  const res = await fetch(url, opts);
  const ct = res.headers.get("content-type") || "";
  const body = ct.includes("application/json")
    ? await res.json()
    : await res.text();
  if (!res.ok) throw new Error(body?.message || res.statusText);
  return body;
};
