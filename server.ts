import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize GoogleGenAI client (server-side only)
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
}

// API endpoint to generate custom RPP using Gemini
app.post("/api/generate-rpp", async (req, res) => {
  try {
    const {
      mataPelajaran,
      bab,
      kelas,
      fase,
      semester,
      alokasiWaktu,
      jumlahPertemuan,
      tahunPelajaran,
      topikPancaCinta,
      namaPenyusun,
      namaMadrasah
    } = req.body;

    if (!mataPelajaran || !bab) {
      return res.status(400).json({ error: "Mata Pelajaran and Bab are required" });
    }

    if (!ai) {
      return res.status(503).json({
        error: "Sistem membutuhkan API Key Gemini. Silakan konfigurasikan GEMINI_API_KEY di menu Setting > Secrets."
      });
    }

    const systemInstruction = `Anda adalah pakar kurikulum dan pengembang pendidikan Islam di Madrasah Aliyah BANU HASYIM. 
Tugas Anda adalah memformulasikan Modul Ajar (RPP) yang mengimplementasikan pendektan Deep Learning (KBC - Kurikulum Berbasis Cinta):
1. Mindful Learning (Belajar Sadar Penuh, fokus, niat lillahita'ala, latihan pernapasan).
2. Meaningful Learning (Pembelajaran bermakna, dikaitkan dengan pengalaman, kesehatan fisik/mental, sportivitas, ta'awun).
3. Joyful Learning (Pembelajaran riang gembira, kolaborasi, permainan, asyik).

Anda HARUS mengembalikan data dalam format JSON murni yang sesuai persis dengan struktur typescript berikut:
interface ModulAjarData {
  id: string;
  judul: string;
  identitas: {
    namaMadrasah: string;
    namaPenyusun: string;
    mataPelajaran: string;
    kelas: string;
    fase: string;
    semester: string;
    alokasiWaktu: string;
    jumlahPertemuan: number;
    tahunPelajaran: string;
  };
  kesiapanPeserta: {
    pengetahuanAwal: string;
    minat: string;
    latarBelakang: string;
    kebutuhanBelajar: { visual: string; auditori: string; kinestetik: string; }
  };
  temaKbc: { topikPancaCinta: string; materiInsersi: string[]; };
  karakteristikMateri: {
    konseptual: string;
    prosedural: string;
    relevansi: string;
    tingkatKesulitan: "Mudah" | "Sedang" | "Sulit";
    strukturMateri: string;
    integrasiNilai: string;
  };
  dimensiProfil: string[];
  capaianPembelajaran: Array<{ id: string; elemen: string; deskripsi: string; }>;
  lintasDisiplin: string[];
  tujuanPembelajaran: Array<{ id: string; pertemuan: string; alokasi: string; deskripsi: string; }>;
  indikatorKetercapaian: string[];
  iklimMadrasah: string[];
  topikKontekstual: string;
  modelPembelajaran: string;
  pendekatanDeepLearning: { mindful: string; meaningful: string; joyful: string; };
  metodePembelajaran: string[];
  strategiBerdiferensiasi: { konten: string; proses: string; produk: string; };
  kemitraan: { sekolah: string; luarSekolah: string; digital: string; };
  lingkunganBelajar: { ruangFisik: string; ruangVirtual: string; budayaBelajar: string; };
  pemanfaatanDigital: string[];
  langkahLangkah: Array<{
    id: string;
    pertemuanKe: number;
    topik: string;
    pancaCinta: string;
    durasi: string;
    pendahuluan: string[];
    inti: string[];
    penutup: string[];
  }>;
  asesmen: { diagnostik: string[]; formatif: string[]; sumatif: string[]; };
  tandaTangan: {
    namaKepala: string;
    nipKepala: string;
    namaGuru: string;
    nipGuru: string;
    tempatTanggal: string;
    jabatanKepala: string;
  };
}

Pastikan bahasa yang digunakan santun, penuh empati, Islami/KBC, mendidik, dan persis dengan gaya Modul Ajar Deep Learning KBC di MA Banu Hasyim. 
Hasilkan jumlah langkahLangkah (pertemuan) sesuai dengan jumlahPertemuan yang diminta (buat ringkasan langkah-langkah yang bermutu untuk setiap pertemuan). 
Jangan memotong respon JSON, kembalikan JSON yang valid lengkap dari awal sampai akhir.`;

    const promptUser = `Buatkan RPP lengkap dengan parameter berikut:
Madrasah: ${namaMadrasah || "MAS BANU HASYIM"}
Penyusun: ${namaPenyusun || "USMAN, S.Pd.I., M.Pd.I."}
Mata Pelajaran: ${mataPelajaran}
Bab/Materi: ${bab}
Kelas: ${kelas || "XII"}
Fase: ${fase || "F"}
Semester: ${semester || "Ganjil"}
Alokasi Waktu: ${alokasiWaktu || "16 JP (" + (jumlahPertemuan || 8) + " kali pertemuan)"}
Jumlah Pertemuan: ${jumlahPertemuan || 8}
Tahun Pelajaran: ${tahunPelajaran || "2025/2026"}
Topik Panca Cinta Utama: ${topikPancaCinta || "Cinta Diri dan Sesama Manusia, Cinta Lingkungan"}

Mohon pastikan langkahLangkah mencakup persis sejumlah pertemuan yaitu ${jumlahPertemuan || 8} pertemuan, masing-masing dengan rincian pendahuluan, inti, dan penutup bertema Deep Learning. Teks bahasa Arab harus berharakat lengkap jika dimasukkan dalam deskripsi atau contoh kosakata.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptUser,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.7
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No response from Gemini");
    }

    const parsedData = JSON.parse(jsonText.trim());
    res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini RPP generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate RPP" });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server RPP KBC running on http://localhost:${PORT}`);
  });
}

startServer();
