// utils/api.js
async function handleResponse(response) {
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Session expired. Please login again.");
  }

  if (!response.ok) {
    let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch (e) {
      try {
        errorMessage = await response.text();
      } catch (textE) {
        // Ignore text read errors
      }
    }
    console.error("API Error:", errorMessage);
    throw new Error(errorMessage);
  }

  return response.status === 204 ? null : response.json();
}

// Auth functions
export async function registerUser(userData) {
  const response = await fetch(`/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
}

export async function loginUser(credentials) {
  const response = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    credentials: 'include'
  });
  const data = await handleResponse(response);
  localStorage.setItem("token", data.token);
  return data;
}

// Favorites functions
export const getFavorites = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch('/api/favorites', {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    credentials: 'include'
  });
  const data = await handleResponse(response);
  return data.favorites || [];
};

export const addFavorite = async (content) => {
  const token = localStorage.getItem("token");
  const response = await fetch('/api/favorites', {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ content }),
    credentials: 'include'
  });
  return handleResponse(response);
};

export const removeFavorite = async (favoriteId) => {
  const token = localStorage.getItem("token");
  const response = await fetch('/api/favorites', {
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ favorite_id: favoriteId }),
    credentials: 'include'
  });
  return handleResponse(response);
};

// History function
export async function getHistory() {
  const token = localStorage.getItem("token");
  const response = await fetch(`/api/history`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  const data = await handleResponse(response);
  return data.history || [];
}

// Search function
export async function searchQuery(query) {
  const token = localStorage.getItem("token");
  const response = await fetch(`/api/search`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query }),
  });
  return handleResponse(response);
}

// Logout function
export function logoutUser() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}