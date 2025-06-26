import { createSignal, onMount } from "solid-js";
import { useNavigate, useSearchParams } from "@solidjs/router";
import MainLayout from "../layouts/MainLayout";
import { getUser, register } from "../utils/auth";
import Swal from "sweetalert2";

export default function UserForm() {
  const [form, setForm] = createSignal({
    id: "",
    name: "",
    username: "",
    password: "",
    role: "Super Admin",
  });
  const [params] = useSearchParams();
  const isEdit = !!params.id;
  const navigate = useNavigate();
  const user = getUser();

  onMount(() => {
    if (isEdit) {
      setForm({
        id: params.id,
        name: params.name,
        username: params.username,
        password: params.password,
        role: params.role,
      });
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registerUser = await register(
        form.name,
        form.username,
        form.password,
        form.role,
        user?.token
      );

      console.log(registerUser);

      Swal.fire({
        title: "Berhasil",
        text: "Berhasil mebuat user baru",
        confirmButtonColor: "#6496df",
        confirmButtonText: "OK",
      }).then(navigate("/users"));
    } catch (error) {
      Swal.fire({
        title: "Gagal",
        text: "Gagal mebuat user baru",
        confirmButtonColor: "#6496df",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <MainLayout>
      <h1 class="text-2xl font-bold mb-4">{isEdit ? "Edit" : "Tambah"} User</h1>
      <form class="space-y-4 max-w-lg" onSubmit={handleSubmit}>
        <div>
          <label class="block mb-1 font-medium">Name</label>
          <input
            type="text"
            class="w-full border p-2 rounded"
            value={form().name}
            onInput={(e) => setForm({ ...form(), name: e.target.value })}
            required
          />
        </div>
        <div>
          <label class="block mb-1 font-medium">Username</label>
          <input
            type="text"
            class="w-full border p-2 rounded"
            value={form().username}
            onInput={(e) => setForm({ ...form(), username: e.target.value })}
            required
          />
        </div>
        <div>
          <label class="block mb-1 font-medium">Password</label>
          <input
            type="text"
            class="w-full border p-2 rounded"
            value={form().password}
            onInput={(e) => setForm({ ...form(), password: e.target.value })}
            required
          />
        </div>
        <div>
          <label class="block mb-1 font-medium">Role</label>
          <select
            class="w-full border p-2 rounded"
            value={form().role}
            onChange={(e) => setForm({ ...form(), role: e.target.value })}
          >
            <option value="0">Super Admin</option>
            <option value="1">Admin</option>
            <option value="2">User (Non-PPN)</option>
            <option value="3">User (PPN)</option>
          </select>
        </div>
        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Simpan
        </button>
      </form>
    </MainLayout>
  );
}
