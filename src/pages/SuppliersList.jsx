import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import MainLayout from "../layouts/MainLayout";

export default function SuppliersList() {
  const navigate = useNavigate();

  const [customers, setCustomers] = createSignal([
    {
      id: 1,
      name: "PT Tekstil Jaya",
      contact: "081234567890",
      address: "Jl. Mawar No. 1",
    },
    {
      id: 2,
      name: "CV Pakaian Cerah",
      contact: "082233445566",
      address: "Jl. Melati No. 5",
    },
  ]);

  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus customer ini?")) {
      setCustomers(customers().filter((cust) => cust.id !== id));
    }
  };

  return (
    <MainLayout>
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Daftar Supplier</h1>
        <button
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate("/customers/form")}
        >
          + Tambah Supplier
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr class="bg-gray-200 text-left text-sm uppercase text-gray-700">
              <th class="py-2 px-4">ID</th>
              <th class="py-2 px-4">Nama</th>
              <th class="py-2 px-4">Kontak</th>
              <th class="py-2 px-4">Alamat</th>
              <th class="py-2 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {customers().map((cust) => (
              <tr class="border-b" key={cust.id}>
                <td class="py-2 px-4">{cust.id}</td>
                <td class="py-2 px-4">{cust.name}</td>
                <td class="py-2 px-4">{cust.contact}</td>
                <td class="py-2 px-4">{cust.address}</td>
                <td class="py-2 px-4 space-x-2">
                  <button
                    class="text-blue-600 hover:underline"
                    onClick={() => navigate(`/customers/form?id=${cust.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    class="text-red-600 hover:underline"
                    onClick={() => handleDelete(cust.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}
