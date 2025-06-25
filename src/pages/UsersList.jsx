import { createEffect, createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import MainLayout from "../layouts/MainLayout";
import { getAllUsers, getUser, softDeleteUser } from "../utils/auth";
import Swal from "sweetalert2";

export default function UsersList() {
  const navigate = useNavigate();
  const user = getUser();

  const [users, setUsers] = createSignal([]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus Pengguna?",
      text: `Apakah kamu yakin ingin menghapus pengguna dengan ID ${id}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        const deleteUser = await softDeleteUser(id, user?.token);
        console.log(deleteUser);

        // Optional: tampilkan alert sukses
        await Swal.fire({
          title: "Terhapus!",
          text: `Data pengguna dengan ID ${id} berhasil dihapus.`,
          icon: "success",
          confirmButtonColor: "#6496df",
        });

        // Optional: update UI setelah hapus
        setUsers(users().filter((u) => u.id !== id));
      } catch (error) {
        Swal.fire({
          title: "Gagal",
          text: `Gagal menghapus data pengguna dengan ID ${id}`,
          icon: "error",
          confirmButtonColor: "#6496df",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleGetAllUsers = async () => {
    try {
      const users = await getAllUsers(user?.token);

      setUsers(users);
    } catch (error) {
      Swal.fire({
        title: "Gagal",
        text: "Gagal mengambil seluruh data pengguna",
        confirmButtonColor: "#6496df",
        confirmButtonText: "OK",
      });
    }
  };

  createEffect(() => {
    if (user?.token) {
      handleGetAllUsers();
    }
  });

  return (
    <MainLayout>
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Daftar Pengguna</h1>
        <button
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate("/users/form")}
        >
          + Tambah User
        </button>
      </div>

      <table class="w-full bg-white shadow rounded">
        <thead class="bg-gray-200 text-sm uppercase text-gray-700">
          <tr>
            <th class="py-2 px-4">ID</th>
            <th class="py-2 px-4">Name</th>
            <th class="py-2 px-4">Username</th>
            <th class="py-2 px-4">Role</th>
            <th class="py-2 px-4">Tanggal Pembuatan</th>
            <th class="py-2 px-4">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users().map((user) => (
            <tr class="border-b" key={user.id}>
              <td class="py-2 px-4">{user.id}</td>
              <td class="py-2 px-4 capitalize">{user.name}</td>
              <td class="py-2 px-4 capitalize">{user.username}</td>
              <td class="py-2 px-4 capitalize">{user.role_name}</td>
              <td class="py-2 px-4">
                {new Date(user.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td class="py-2 px-4 space-x-2">
                <button
                  class="text-blue-600 hover:underline"
                  onClick={() => navigate(`/users/form?id=${user.id}`)}
                >
                  Edit
                </button>
                <button
                  class="text-red-600 hover:underline"
                  onClick={() => handleDelete(user.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
}
