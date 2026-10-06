export function tampilkanData(data) {
  if (data.length === 0) {
    console.log("Belum ada data.");
    return;
  }

  const daftarData = data.map(
    (item, index) =>
      `${index + 1}. Nama: ${item.nama} | Umur: ${item.umur} | Alamat: ${item.alamat} | Email: ${item.email}`,
  );
  console.log("\n=== Daftar Data ===");
  console.log(daftarData.join("\n"));
}