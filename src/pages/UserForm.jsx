import { createSignal, onMount } from "solid-js";
import { useNavigate, useSearchParams } from "@solidjs/router";
import MainLayout from "../layouts/MainLayout";

export default function UserForm() {
  const [form, setForm] = createSignal({ id: "", username: "", role: "PPN" });
  const [params] = useSearchParams();
  const isEdit = !!params.id;
  const navigate = useNavigate();

  onMount(() => {
    if (isEdit) {
      setForm({ id: params.id, username: "edituser", role: "Non-PPN" });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`User ${isEdit ? "diedit" : "ditambahkan"}`);
    navigate("/users");
  };

  return (
    <MainLayout>
      <h1 class="text-2xl font-bold mb-4">{isEdit ? "Edit" : "Tambah"} User</h1>
      <form class="space-y-4 max-w-lg" onSubmit={handleSubmit}>
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
          <label class="block mb-1 font-medium">Role</label>
          <select
            class="w-full border p-2 rounded"
            value={form().role}
            onChange={(e) => setForm({ ...form(), role: e.target.value })}
          >
            <option value="PPN">PPN</option>
            <option value="Non-PPN">Non-PPN</option>
          </select>
        </div>
        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Simpan
        </button>
      </form>
    </MainLayout>
  );
}
