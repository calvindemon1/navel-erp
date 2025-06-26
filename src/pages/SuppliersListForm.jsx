import { createSignal, onMount } from "solid-js";
import { useNavigate, useSearchParams } from "@solidjs/router";
import MainLayout from "../layouts/MainLayout";

export default function SuppliersListForm() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const isEdit = !!params.id;

  const [form, setForm] = createSignal({
    id: "",
    name: "",
    contact: "",
    address: "",
  });

  onMount(() => {
    if (isEdit) {
      setForm({
        id: params.id,
        name: "PT Contoh Edit",
        contact: "0899998888",
        address: "Jl. Editan No. 2",
      });
    }
  });

  const handleChange = (field, value) => {
    setForm({ ...form(), [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Customer: ", form());
    alert(`Customer berhasil ${isEdit ? "diedit" : "ditambahkan"}`);
    navigate("/customers");
  };

  return (
    <MainLayout>
      <h1 class="text-2xl font-bold mb-4">
        {isEdit ? "Edit Customer" : "Tambah Customer"}
      </h1>
      <form class="space-y-4 max-w-lg" onSubmit={handleSubmit}>
        <div>
          <label class="block mb-1 font-medium">Nama</label>
          <input
            type="text"
            class="w-full border p-2 rounded"
            value={form().name}
            onInput={(e) => handleChange("name", e.target.value)}
            required
          />
        </div>
        <div>
          <label class="block mb-1 font-medium">Kontak</label>
          <input
            type="text"
            class="w-full border p-2 rounded"
            value={form().contact}
            onInput={(e) => handleChange("contact", e.target.value)}
            required
          />
        </div>
        <div>
          <label class="block mb-1 font-medium">Alamat</label>
          <textarea
            class="w-full border p-2 rounded"
            value={form().address}
            onInput={(e) => handleChange("address", e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Simpan
        </button>
      </form>
    </MainLayout>
  );
}
