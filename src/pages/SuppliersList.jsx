import { createEffect, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import MainLayout from "../layouts/MainLayout";
import { getAllSuppliers, getUser, softDeleteSupplier } from "../utils/auth";
import Swal from "sweetalert2";

export default function SuppliersList() {
  const navigate = useNavigate();
  const tokUser = getUser();

  const [suppliers, setSuppliers] = createSignal([]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus supplier?",
      text: `Apakah kamu yakin ingin menghapus supplier dengan ID ${id}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        const deleteSupplier = await softDeleteSupplier(id, tokUser?.token);

        await Swal.fire({
          title: "Terhapus!",
          text: `Data supplier dengan ID ${id} berhasil dihapus.`,
          icon: "success",
          confirmButtonColor: "#6496df",
        });

        // Optional: update UI setelah hapus
        setSuppliers(suppliers().filter((s) => s.id !== id));
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Gagal",
          text:
            error.message || `Gagal menghapus data supplier dengan ID ${id}`,
          icon: "error",
          confirmButtonColor: "#6496df",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleGetAllSuppliers = async (tok) => {
    const getDataSuppliers = await getAllSuppliers(tok);

    setSuppliers(getDataSuppliers);
  };

  function formatPhoneNumber(phone) {
    if (!phone) return "";

    // Ambil kode area (3 digit pertama)
    const area = phone.slice(0, 3);
    const number = phone.slice(3);

    return `(${area}) ${number}`;
  }

  createEffect(() => {
    if (tokUser?.token) {
      handleGetAllSuppliers(tokUser?.token);
    }
  });
  return (
    <MainLayout>
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Daftar Supplier</h1>
        <button
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate("/suppliers/form")}
        >
          + Tambah Supplier
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr class="bg-gray-200 text-left text-sm uppercase text-gray-700">
              <th class="py-2 px-4">ID</th>
              <th class="py-2 px-4">Kode Supplier</th>
              <th class="py-2 px-4">Alias</th>
              <th class="py-2 px-4">Nama</th>
              <th class="py-2 px-4">No Telp</th>
              <th class="py-2 px-4">No HP</th>
              <th class="py-2 px-4">Alamat</th>
              <th class="py-2 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {suppliers().map((supp) => (
              <tr class="border-b" key={supp.id}>
                <td class="py-2 px-4">{supp.id}</td>
                <td class="py-2 px-4">{supp.kode}</td>
                <td class="py-2 px-4">{supp.alias}</td>
                <td class="py-2 px-4">{supp.nama}</td>
                <td class="py-2 px-4">{formatPhoneNumber(supp.no_telp)}</td>
                <td class="py-2 px-4">{supp.no_hp}</td>
                <td class="py-2 px-4">{supp.alamat}</td>
                <td class="py-2 px-4 space-x-2">
                  <button
                    class="text-blue-600 hover:underline"
                    onClick={() => navigate(`/suppliers/form?id=${supp.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    class="text-red-600 hover:underline"
                    onClick={() => handleDelete(supp.id)}
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
