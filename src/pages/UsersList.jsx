import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import MainLayout from "../layouts/MainLayout";

export default function UsersList() {
  const navigate = useNavigate();

  const [users, setUsers] = createSignal([
    { id: 1, username: "admin", role: "PPN" },
    { id: 2, username: "staff", role: "Non-PPN" },
  ]);

  const handleDelete = (id) => {
    if (confirm("Hapus user ini?")) {
      setUsers(users().filter((u) => u.id !== id));
    }
  };

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
            <th class="py-2 px-4">Username</th>
            <th class="py-2 px-4">Role</th>
            <th class="py-2 px-4">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users().map((user) => (
            <tr class="border-b" key={user.id}>
              <td class="py-2 px-4">{user.id}</td>
              <td class="py-2 px-4">{user.username}</td>
              <td class="py-2 px-4">{user.role}</td>
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
