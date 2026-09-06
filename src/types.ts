export interface IdentitasModul {
  namaMadrasah: string;
  namaPenyusun: string;
  mataPelajaran: string;
  kelas: string;
  fase: string;
  semester: string;
  alokasiWaktu: string; // e.g. "16 JP (8 kali pertemuan)"
  jumlahPertemuan: number; // e.g. 8
  tahunPelajaran: string;
}

export interface KebutuhanBelajar {
  visual: string;
  auditori: string;
  kinestetik: string;
}

export interface IdentifikasiKesiapan {
  pengetahuanAwal: string;
  minat: string;
  latarBelakang: string;
  kebutuhanBelajar: KebutuhanBelajar;
}

export interface TemaKBC {
  topikPancaCinta: string; // Dropdown
  materiInsersi: string[];
}

export interface KarakteristikMateri {
  konseptual: string;
  prosedural: string;
  relevansi: string;
  tingkatKesulitan: "Mudah" | "Sedang" | "Sulit";
  strukturMateri: string;
  integrasiNilai: string;
}

export interface CapaianPembelajaranRow {
  id: string;
  elemen: string;
  deskripsi: string;
}

export interface TujuanPembelajaranRow {
  id: string;
  pertemuan: string; // e.g. "Pertemuan 1-2"
  alokasi: string; // e.g. "2JP + 2JP"
  deskripsi: string;
}

export interface LangkahPertemuan {
  id: string;
  pertemuanKe: number;
  topik: string;
  pancaCinta: string;
  durasi: string; // e.g. "2 JP (90 Menit)"
  pendahuluan: string[];
  inti: string[];
  penutup: string[];
}

export interface AsesmenDetail {
  diagnostik: string[];
  formatif: string[];
  sumatif: string[];
}

export interface TandaTangan {
  namaKepala: string;
  nipKepala?: string;
  namaGuru: string;
  nipGuru?: string;
  tempatTanggal: string;
  jabatanKepala: string; // e.g. "Kepala MAS Banu Hasyim"
}

export interface ModulAjarData {
  id: string;
  judul: string;
  identitas: IdentitasModul;
  kesiapanPeserta: IdentifikasiKesiapan;
  temaKbc: TemaKBC;
  karakteristikMateri: KarakteristikMateri;
  dimensiProfil: string[]; // checkboxes / dropdown
  capaianPembelajaran: CapaianPembelajaranRow[];
  lintasDisiplin: string[];
  tujuanPembelajaran: TujuanPembelajaranRow[];
  indikatorKetercapaian: string[];
  iklimMadrasah: string[];
  topikKontekstual: string;
  modelPembelajaran: string;
  pendekatanDeepLearning: {
    mindful: string;
    meaningful: string;
    joyful: string;
  };
  metodePembelajaran: string[];
  strategiBerdiferensiasi: {
    konten: string;
    proses: string;
    produk: string;
  };
  kemitraan: {
    sekolah: string;
    luarSekolah: string;
    digital: string;
  };
  lingkunganBelajar: {
    ruangFisik: string;
    ruangVirtual: string;
    budayaBelajar: string;
  };
  pemanfaatanDigital: string[];
  langkahLangkah: LangkahPertemuan[];
  asesmen: AsesmenDetail;
  tandaTangan: TandaTangan;
}
