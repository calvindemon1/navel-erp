import { createSignal, onMount } from "solid-js";
import { useNavigate, useSearchParams } from "@solidjs/router";
import MainLayout from "../../layouts/MainLayout";
import {
  createSupplier,
  getSupplier,
  getUser,
  updateDataSupplier,
} from "../../utils/auth";
import Swal from "sweetalert2";

export default function SuppliersListForm() {
  const [form, setForm] = createSignal({
    id: "",
    kode: "",
    alias: "",
    nama: "",
    no_telp: "",
    no_hp: "",
    alamat: "",
  });
  const [params] = useSearchParams();
  const isEdit = !!params.id;
  const navigate = useNavigate();
  const user = getUser();

  onMount(async () => {
    if (isEdit) {
      const supplierData = await getSupplier(params.id, user?.token);
      setForm({
        id: params.id,
        kode: supplierData.kode,
        alias: supplierData.alias,
        nama: supplierData.nama,
        no_telp: supplierData.no_telp,
        no_hp: supplierData.no_hp,
        alamat: supplierData.alamat,
      });
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateDataSupplier(
          user?.token,
          params.id,
          form().kode,
          form().alias,
          form().nama,
          form().no_telp,
          form().no_hp,
          form().alamat
        );
      } else {
        await createSupplier(
          user?.token,
          form().kode,
          form().alias,
          form().nama,
          form().no_telp,
          form().no_hp,
          form().alamat
        );
      }

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: isEdit
          ? "Berhasil mengubah data supplier"
          : "Berhasil mebuat supplier baru",
        confirmButtonColor: "#6496df",
        confirmButtonText: "OK",
      }).then(() => navigate("/suppliers"));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: isEdit
          ? "Gagal mengubah data supplier"
          : "Gagal membuat data supplier baru",
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
          <label class="block mb-1 font-medium">Kode</label>
          <input
            type="text"
            class="w-full border p-2 rounded"
            value={form().kode}
            onInput={(e) => setForm({ ...form(), kode: e.target.value })}
            required
          />
        </div>
        <div>
          <label class="block mb-1 font-medium">Alias</label>
          <input
            type="text"
            class="w-full border p-2 rounded"
            value={form().alias}
            onInput={(e) => setForm({ ...form(), alias: e.target.value })}
            required
          />
        </div>
        <div>
          <label class="block mb-1 font-medium">Nama</label>
          <input
            type="text"
            class="w-full border p-2 rounded"
            value={form().nama}
            onInput={(e) => setForm({ ...form(), nama: e.target.value })}
            required
          />
        </div>
        <div>
          <label class="block mb-1 font-medium">No Telp</label>
          <input
            type="text"
            class="w-full border p-2 rounded"
            value={form().no_telp}
            onInput={(e) => setForm({ ...form(), no_telp: e.target.value })}
            required
          />
        </div>
        <div>
          <label class="block mb-1 font-medium">No HP</label>
          <input
            type="text"
            class="w-full border p-2 rounded"
            value={form().no_hp}
            onInput={(e) => setForm({ ...form(), no_hp: e.target.value })}
            required
          />
        </div>
        <div>
          <label class="block mb-1 font-medium">Alamat</label>
          <input
            type="text"
            class="w-full border p-2 rounded"
            value={form().alamat}
            onInput={(e) => setForm({ ...form(), alamat: e.target.value })}
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
