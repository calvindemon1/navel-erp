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

// CUSTOMERS FUNCTION

export async function createCustomer(
  token,
  kode,
  alias,
  nama,
  customer_type_id,
  no_telp,
  no_hp,
  alamat,
  termin,
  limit_kredit
) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/create-customer`,
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
          customer_type_id: parseInt(customer_type_id, 10),
          no_telp: no_telp,
          no_hp: no_hp,
          alamat: alamat,
          termin: termin,
          limit_kredit: Number(limit_kredit),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Gagal membuat data customer");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllCustomers(token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/customers`,
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
      throw new Error(data.message || "Gagal mengambil data customer");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCustomer(id, token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/customers/${id}`,
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
        data.message || `Gagal mengambil customer dengan id: ${id}`
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateDataCustomer(
  token,
  id,
  kode,
  alias,
  nama,
  customer_type_id,
  no_telp,
  no_hp,
  alamat,
  termin,
  limit_kredit
) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/update-customer/${id}`,
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
          customer_type_id: parseInt(customer_type_id, 10),
          no_telp: no_telp,
          no_hp: no_hp,
          alamat: alamat,
          termin: termin,
          limit_kredit: Number(limit_kredit),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Gagal mengubah data customer");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function softDeleteCustomer(id, token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/delete-customer/${id}`,
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
        data.message || `Gagal menghapus data customer dengan id: ${id}`
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// CUSTOMERS FUNCTION

// COLORS FUNCTION

export async function createColor(token, kode, jenis) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/create-warna`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "any-value",
        },
        body: JSON.stringify({ kode: kode, jenis: jenis }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Gagal membuat data warna");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllColors(token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/warna`,
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
      throw new Error(data.message || "Gagal mengambil data warna");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getColor(id, token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/warna/${id}`,
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
      throw new Error(data.message || `Gagal mengambil warna dengan id: ${id}`);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateDataColor(token, id, kode, jenis) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/update-warna/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "any-value",
        },
        body: JSON.stringify({ kode: kode, jenis: jenis }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Gagal mengubah data warna");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function softDeleteColor(id, token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/delete-warna/${id}`,
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
        data.message || `Gagal menghapus data warna dengan id: ${id}`
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// COLORS FUNCTION

// FABRICS FUNCTION

export async function createFabric(token, kode, jenis) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/create-kain`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "any-value",
        },
        body: JSON.stringify({ kode: kode, jenis: jenis }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Gagal membuat data kain");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllFabrics(token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/kain`,
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
      throw new Error(data.message || "Gagal mengambil data kain");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getFabric(id, token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/kain/${id}`,
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
      throw new Error(data.message || `Gagal mengambil kain dengan id: ${id}`);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateDataFabric(token, id, kode, jenis) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/update-kain/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "any-value",
        },
        body: JSON.stringify({ kode: kode, jenis: jenis }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Gagal mengubah data kain");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function softDeleteFabric(id, token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/delete-kain/${id}`,
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
        data.message || `Gagal menghapus data kain dengan id: ${id}`
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// FABRICS FUNCTION

// #region SO TYPE FUNCTION

export async function createSOType(token, jenis) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/create-jenis-so`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "any-value",
        },
        body: JSON.stringify({ jenis: jenis }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Gagal membuat data jenis so");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllSOTypes(token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/jenis-sos`,
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
      throw new Error(data.message || "Gagal mengambil data jenis so");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSOType(id, token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/jenis-so/${id}`,
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
        data.message || `Gagal mengambil jenis so dengan id: ${id}`
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateDataSOType(token, id, jenis) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/update-jenis-so/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "any-value",
        },
        body: JSON.stringify({ jenis: jenis }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Gagal mengubah data jenis so");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function softDeleteSOType(id, token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/delete-jenis-so/${id}`,
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
        data.message || `Gagal menghapus data jenis so dengan id: ${id}`
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// #endregion SO TYPE FUNCTION

// #region CUSTOMER TYPE FUNCTION

export async function createCustomerType(token, jenis) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/create-customer-type`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "any-value",
        },
        body: JSON.stringify({ jenis: jenis }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Gagal membuat data jenis so");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllCustomerTypes(token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/customer-types`,
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
      throw new Error(data.message || "Gagal mengambil data jenis so");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCustomerType(id, token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/customer-types/${id}`,
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
        data.message || `Gagal mengambil jenis so dengan id: ${id}`
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateDataCustomerType(token, id, jenis) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/update-customer-type/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "any-value",
        },
        body: JSON.stringify({ jenis: jenis }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Gagal mengubah data jenis so");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function softDeleteCustomerType(id, token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/delete-customer-type/${id}`,
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
        data.message || `Gagal menghapus data jenis so dengan id: ${id}`
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// #endregion CUSTOMER TYPE FUNCTION

// #region CURRENCIES FUNCTION

export async function createCurrencies(token, nama) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/create-currency`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "any-value",
        },
        body: JSON.stringify({ nama: nama }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Gagal membuat data jenis so");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllCurrenciess(token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/currencies`,
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
      throw new Error(data.message || "Gagal mengambil data jenis so");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCurrencies(id, token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/currencies/${id}`,
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
        data.message || `Gagal mengambil jenis so dengan id: ${id}`
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateDataCurrencies(token, id, nama) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/update-currency/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "any-value",
        },
        body: JSON.stringify({ nama: nama }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Gagal mengubah data jenis so");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function softDeleteCurrencies(id, token) {
  try {
    const response = await fetch(
      `https://477c-2001-448a-304f-6ffa-7ca4-1549-d460-bff0.ngrok-free.app/api/delete-currency/${id}`,
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
        data.message || `Gagal menghapus data jenis so dengan id: ${id}`
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// #endregion CURRENCIES FUNCTION

export function logout() {
  localStorage.removeItem("user");
}
