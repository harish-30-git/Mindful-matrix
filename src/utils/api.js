export const fetchWithToken = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.href = "/login"; // Redirect if token invalid
    }
    const errorData = await response.json();
    throw new Error(errorData.msg || "Request failed");
  }

  return response.json();
};
