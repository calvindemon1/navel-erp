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
      "https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/login",
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
      "https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "any-value",
        },
        body: JSON.stringify({
          name,
          username,
          password,
          role_id: parseInt(role_id, 10),
        }),
      }
    );

    console.log({ name, username, password, role_id: parseInt(role_id, 10) });

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
      "https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/token-status",
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

export async function getDataUser(id, token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/users/${id}`,
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

export async function getAllUsers(token) {
  try {
    const response = await fetch(
      "https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/users",
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

export async function updateUser(userId, name, username, role_id, token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/update-user/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "any-value",
        },
        body: JSON.stringify({
          name,
          username,
          role_id: parseInt(role_id, 10),
        }),
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

export async function softDeleteUser(userId, token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/delete-user/${userId}`,
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

// SUPPLIERS FUNCTION

export async function createSupplier(
  token,
  kode,
  alias,
  nama,
  no_telp,
  no_hp,
  alamat
) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/create-supplier`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "any-value",
        },
        body: JSON.stringify({
          kode: kode,
          alias: alias,
          nama: nama,
          no_telp: no_telp,
          no_hp: no_hp,
          alamat: alamat,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Gagal membuat data supplier");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllSuppliers(token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/suppliers`,
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
      throw new Error(data.message || "Gagal mengambil data supplier");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSupplier(id, token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/suppliers/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "any-type",
        },
      }
    );

    const data = response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `Gagal mengambil supplier dengan id: ${id}`
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateDataSupplier(
  token,
  id,
  kode,
  alias,
  nama,
  no_telp,
  no_hp,
  alamat
) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/update-supplier/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "any-value",
        },
        body: JSON.stringify({
          kode: kode,
          alias: alias,
          nama: nama,
          no_telp: no_telp,
          no_hp: no_hp,
          alamat: alamat,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Gagal mengubah data supplier");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function softDeleteSupplier(id, token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/delete-supplier/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "any-type",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `Gagal menghapus data supplier dengan id: ${id}`
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// SUPPLIERS FUNCTION

export function logout() {
  localStorage.removeItem("user");
}
