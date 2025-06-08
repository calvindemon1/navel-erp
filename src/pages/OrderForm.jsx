import { createSignal, onMount } from "solid-js";
import { useNavigate, useSearchParams } from "@solidjs/router";
import MainLayout from "../layouts/MainLayout";

export default function OrderForm() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const isEdit = !!params.id;

  const [form, setForm] = createSignal({
    id: "",
    customer: "",
    item: "",
    quantity: "",
    status: "Proses",
  });

  // Simulasi data edit
  onMount(() => {
    if (isEdit) {
      // fake data ambil dari ID
      setForm({
        id: params.id,
        customer: "PT Editan",
        item: "Kain Denim",
        quantity: "150",
        status: "Selesai",
      });
    }
  });

  const handleChange = (field, value) => {
    setForm({ ...form(), [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted: ", form());
    alert(`Pesanan berhasil ${isEdit ? "diedit" : "ditambahkan"}`);
    navigate("/orders");
  };

  return (
    <MainLayout>
      <h1 class="text-2xl font-bold mb-4">
        {isEdit ? "Edit Pesanan" : "Tambah Pesanan"}
      </h1>
      <form class="space-y-4 max-w-lg" onSubmit={handleSubmit}>
        <div>
          <label class="block mb-1 font-medium">Customer</label>
          <input
            type="text"
            class="w-full border p-2 rounded"
            value={form().customer}
            onInput={(e) => handleChange("customer", e.target.value)}
            required
          />
        </div>
        <div>
          <label class="block mb-1 font-medium">Item</label>
          <input
            type="text"
            class="w-full border p-2 rounded"
            value={form().item}
            onInput={(e) => handleChange("item", e.target.value)}
            required
          />
        </div>
        <div>
          <label class="block mb-1 font-medium">Jumlah</label>
          <input
            type="number"
            class="w-full border p-2 rounded"
            value={form().quantity}
            onInput={(e) => handleChange("quantity", e.target.value)}
            required
          />
        </div>
        <div>
          <label class="block mb-1 font-medium">Status</label>
          <select
            class="w-full border p-2 rounded"
            value={form().status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            <option value="Proses">Proses</option>
            <option value="Selesai">Selesai</option>
          </select>
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
