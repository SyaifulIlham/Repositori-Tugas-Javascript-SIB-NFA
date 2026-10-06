import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { fileURLToPath } from "node:url";
import data from "./data.mjs";
import { tampilkanData } from "./view.mjs";

export function lihatData() {
  tampilkanData(data);
}

export async function tambahData(tanya) {
  const dataBaru = [];

  for (let nomor = 1; nomor <= 2; nomor += 1) {
    console.log(`\nMasukkan data ke-${nomor}:`);
    const nama = await tanya("Nama: ");
    const umurInput = await tanya("Umur: ");
    const umur = Number(umurInput);
    const alamat = await tanya("Alamat: ");
    const email = await tanya("Email: ");

    if (nama === null || umurInput === null || alamat === null || email === null) {
      console.log("Input berakhir. Penambahan data dibatalkan.");
      return;
    }

    if (!nama.trim() || !Number.isInteger(umur) || umur <= 0 || !alamat.trim() || !email.trim()) {
      console.log("Data tidak valid. Nama, alamat, dan email wajib diisi; umur harus bilangan bulat positif.");
      nomor -= 1;
      continue;
    }

    dataBaru.push({ nama: nama.trim(), umur, alamat: alamat.trim(), email: email.trim() });
  }

  data.push(...dataBaru);
  console.log(`${dataBaru.length} data berhasil ditambahkan.`);
}

export async function hapusData(tanya) {
  const jawaban = await tanya("Masukkan email data yang akan dihapus: ");
  if (jawaban === null) {
    return;
  }

  const email = jawaban.trim().toLowerCase();
  const index = data.findIndex((item) => item.email.toLowerCase() === email);

  if (index === -1) {
    console.log("Data dengan email tersebut tidak ditemukan.");
    return;
  }

  const [dataTerhapus] = data.splice(index, 1);
  console.log(`Data ${dataTerhapus.nama} berhasil dihapus.`);
}

export async function mulaiAplikasi() {
  const rl = createInterface({ input: stdin, output: stdout });
  const input = rl[Symbol.asyncIterator]();
  const tanya = async (pesan) => {
    stdout.write(pesan);
    const { value, done } = await input.next();
    return done ? null : value;
  };

  try {
    let berjalan = true;

    while (berjalan) {
      console.log("\n=== Pengelolaan Data ===");
      console.log("1. Melihat data");
      console.log("2. Menambah data (2 data)");
      console.log("3. Menghapus data");
      console.log("0. Keluar");

      const jawaban = await tanya("Pilih perintah: ");
      if (jawaban === null) {
        berjalan = false;
        continue;
      }

      const pilihan = jawaban.trim();

      switch (pilihan) {
        case "1":
          lihatData();
          break;
        case "2":
          await tambahData(tanya);
          break;
        case "3":
          await hapusData(tanya);
          break;
        case "0":
          berjalan = false;
          console.log("Program selesai.");
          break;
        default:
          console.log("Pilihan tidak valid. Silakan pilih 1, 2, 3, atau 0.");
      }
    }
  } finally {
    rl.close();
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  await mulaiAplikasi();
}
