import { createSignal, onMount } from "solid-js";
import { useNavigate, useSearchParams } from "@solidjs/router";
import MainLayout from "../layouts/MainLayout";
import {
  createCustomer,
  getCustomer,
  getUser,
  updateDataCustomer,
} from "../utils/auth";
import Swal from "sweetalert2";

export default function SuppliersListForm() {
  const [form, setForm] = createSignal({
    id: "",
    kode: "",
    alias: "",
    nama: "",
    customer_type_id: "",
    no_telp: "",
    no_hp: "",
    alamat: "",
    termin: "",
    limit_kredit: "",
  });
  const [params] = useSearchParams();
  const isEdit = !!params.id;
  const navigate = useNavigate();
  const user = getUser();

  onMount(async () => {
    if (isEdit) {
      const customerData = await getCustomer(params.id, user?.token);
      setForm({
        id: params.id,
        kode: customerData.kode,
        alias: customerData.alias,
        nama: customerData.nama,
        customer_type_id: customerData.customer_type_id,
        no_telp: customerData.no_telp,
        no_hp: customerData.no_hp,
        alamat: customerData.alamat,
        termin: customerData.termin,
        limit_kredit: customerData.limit_kredit,
      });
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateDataCustomer(
          user?.token,
          params.id,
          form().kode,
          form().alias,
          form().nama,
          form().customer_type_id,
          form().no_telp,
          form().no_hp,
          form().alamat,
          form().termin,
          form().limit_kredit
        );
      } else {
        await createCustomer(
          user?.token,
          form().kode,
          form().alias,
          form().nama,
          form().customer_type_id,
          form().no_telp,
          form().no_hp,
          form().alamat,
          form().termin,
          form().limit_kredit
        );
      }

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: isEdit
          ? "Berhasil mengubah data customer"
          : "Berhasil mebuat customer baru",
        confirmButtonColor: "#6496df",
        confirmButtonText: "OK",
      }).then(() => navigate("/customers"));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: isEdit
          ? "Gagal mengubah data customer"
          : "Gagal membuat data customer baru",
        confirmButtonColor: "#6496df",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <MainLayout>
      <h1 class="text-2xl font-bold mb-4">
        {isEdit ? "Edit" : "Tambah"} Customer
      </h1>
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
          <label class="block mb-1 font-medium">Tipe Customer</label>
          <select
            class="w-full border p-2 rounded"
            value={form().customer_type_id}
            onChange={(e) =>
              setForm({ ...form(), customer_type_id: e.target.value })
            }
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
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
        <div>
          <label class="block mb-1 font-medium">Termin</label>
          <input
            type="text"
            class="w-full border p-2 rounded"
            value={form().termin}
            onInput={(e) => setForm({ ...form(), termin: e.target.value })}
            required
          />
        </div>
        <div>
          <label class="block mb-1 font-medium">Limit Kredit</label>
          <input
            type="number "
            class="w-full border p-2 rounded"
            value={form().limit_kredit}
            onInput={(e) =>
              setForm({ ...form(), limit_kredit: e.target.value })
            }
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
