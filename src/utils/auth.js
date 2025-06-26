import { users } from "../data/users";

// export function login(username, password) {
//   const user = users.find(
//     (u) => u.username === username && u.password === password
//   );
//   if (user) {
//     localStorage.setItem("user", JSON.stringify(user));
//     return user;
//   } else {
//     return null;
//   }
// }

// LOGIN, REGISTER AND REGISTER

export async function login(username, password) {
  try {
    const response = await fetch(
      "https://8635-2404-8000-1024-7a86-15e5-1937-db5a-7ac8.ngrok-free.app/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await response.json();

    localStorage.setItem("user", JSON.stringify(data));

    if (!response.ok) {
      throw new Error(data.message || "Login gagal");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function register(name, username, password, role_id, token) {
  try {
    const response = await fetch(
      "https://8635-2404-8000-1024-7a86-15e5-1937-db5a-7ac8.ngrok-free.app/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "any-value",
        },
        body: JSON.stringify({ name, username, password, role_id }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registrasi gagal");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTokenStatus(token) {
  try {
    const response = await fetch(
      "https://8635-2404-8000-1024-7a86-15e5-1937-db5a-7ac8.ngrok-free.app/api/token-status",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "any-value",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Gagal mengambil status token");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// LOGIN, REGISTER AND REGISTER

// USERS FUNCTION

export async function getAllUsers(token) {
  try {
    const response = await fetch(
      "https://8635-2404-8000-1024-7a86-15e5-1937-db5a-7ac8.ngrok-free.app/api/users",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "any-value",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Gagal mengambiil data pengguna");
    }

    return data;
  } catch (error) {
    // console.error("Gagal mengambil seluruh data pengguna: ", error.message);
    throw error;
  }
}

export async function softDeleteUser(userId, token) {
  try {
    const response = await fetch(
      `https://8635-2404-8000-1024-7a86-15e5-1937-db5a-7ac8.ngrok-free.app/api/delete-user/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "any-value",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `Gagal menghapus data pengguna dengan id: ${userId}`
      );
    }

    return data;
  } catch (error) {
    // console.error("Gagal menghapus pengguna: ", error.message);
    throw error;
  }
}

export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

// USERS FUNCTION

export function logout() {
  localStorage.removeItem("user");
}
