import { createSignal, onMount } from "solid-js";
import { useNavigate, useSearchParams } from "@solidjs/router";
import MainLayout from "../layouts/MainLayout";

export default function TransactionForm() {
  const [form, setForm] = createSignal({ id: "", name: "" });
  const [params] = useSearchParams();
  const isEdit = !!params.id;
  const navigate = useNavigate();

  onMount(() => {
    if (isEdit) {
      setForm({ id: params.id, name: "Edit Transaksi Contoh" });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Transaksi ${isEdit ? "diedit" : "ditambahkan"}: ${form().name}`);
    navigate("/transactions");
  };

  return (
    <MainLayout>
      <h1 class="text-2xl font-bold mb-4">
        {isEdit ? "Edit" : "Tambah"} Transaksi
      </h1>
      <form class="space-y-4 max-w-lg" onSubmit={handleSubmit}>
        <div>
          <label class="block mb-1 font-medium">Nama Transaksi</label>
          <input
            type="text"
            class="w-full border p-2 rounded"
            value={form().name}
            onInput={(e) => setForm({ ...form(), name: e.target.value })}
            required
          />
        </div>
        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Simpan
        </button>
      </form>
    </MainLayout>
  );
}
