import { createSignal, onMount } from "solid-js";
import { useNavigate, useSearchParams } from "@solidjs/router";
import MainLayout from "../../layouts/MainLayout";
import { createColor, getColor, getUser, updateDataColor } from "../../utils/auth";
import Swal from "sweetalert2";

export default function ColorForm() {
  const [form, setForm] = createSignal({
    id: "",
    kode: "",
    jenis: "",
  });
  const [params] = useSearchParams();
  const isEdit = !!params.id;
  const navigate = useNavigate();
  const user = getUser();

  onMount(async () => {
    if (isEdit) {
      const colorData = await getColor(params.id, user?.token);
      setForm({
        id: params.id,
        kode: colorData.kode,
        jenis: colorData.jenis,
      });
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateDataColor(
          user?.token,
          params.id,
          form().kode,
          form().jenis
        );
      } else {
        await createColor(user?.token, form().kode, form().jenis);
      }

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: isEdit
          ? "Berhasil mengubah data warna"
          : "Berhasil mebuat warna baru",
        confirmButtonColor: "#6496df",
        confirmButtonText: "OK",
      }).then(() => navigate("/colors"));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: isEdit
          ? "Gagal mengubah data warna"
          : "Gagal membuat data warna baru",
        confirmButtonColor: "#6496df",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <MainLayout>
      <h1 class="text-2xl font-bold mb-4">
        {isEdit ? "Edit" : "Tambah"} Warna
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
          <label class="block mb-1 font-medium">Jenis</label>
          <input
            type="text"
            class="w-full border p-2 rounded"
            value={form().jenis}
            onInput={(e) => setForm({ ...form(), jenis: e.target.value })}
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
