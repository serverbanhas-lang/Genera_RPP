import React, { useState } from "react";
import { ModulAjarData } from "../types";
import { 
  OPTIONS_PANCA_CINTA, 
  OPTIONS_DIMENSI_PROFIL, 
  OPTIONS_FASE, 
  OPTIONS_SEMESTER, 
  OPTIONS_KELAS 
} from "../defaultData";
import { 
  BookOpen, 
  Sparkles, 
  RefreshCw, 
  FileText, 
  Compass, 
  Users, 
  Clock, 
  Calendar,
  AlertCircle
} from "lucide-react";

interface FormPanelProps {
  data: ModulAjarData;
  onChange: (updatedData: ModulAjarData) => void;
  onReset: () => void;
  onGenerateAI: (subject: string, topic: string, pancaCinta: string, meetings: number) => Promise<void>;
  isGenerating: boolean;
  aiError: string | null;
}

export const FormPanel: React.FC<FormPanelProps> = ({
  data,
  onChange,
  onReset,
  onGenerateAI,
  isGenerating,
  aiError
}) => {
  // AI Generator inputs
  const [aiSubject, setAiSubject] = useState("Bahasa Arab");
  const [aiTopic, setAiTopic] = useState("Bab 2: الصحة (Kesehatan)");
  const [aiPancaCinta, setAiPancaCinta] = useState(OPTIONS_PANCA_CINTA[1]); // Default to Cinta Diri
  const [aiMeetings, setAiMeetings] = useState(8);

  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);

  // Field updates
  const handleIdentitasChange = (field: keyof ModulAjarData["identitas"], value: any) => {
    const updatedIdentitas = { ...data.identitas, [field]: value };
    
    // Auto sync alokasiWaktu text if JP or pertemuan changes
    if (field === "jumlahPertemuan") {
      const jpCount = value * 2; // Assumption of 2 JP per meeting
      updatedIdentitas.alokasiWaktu = `${jpCount} JP (${value} kali pertemuan)`;
      
      // Expand or trim langkahLangkah array based on new count
      let currentLangkah = [...data.langkahLangkah];
      const diff = value - currentLangkah.length;
      
      if (diff > 0) {
        // Add new blank meetings
        for (let i = 0; i < diff; i++) {
          const meetingNum = currentLangkah.length + 1;
          currentLangkah.push({
            id: `ptm-added-${Date.now()}-${meetingNum}`,
            pertemuanKe: meetingNum,
            topik: `Pembahasan Materi Sesi ${meetingNum} terkait ${data.judul.replace("Modul Ajar Bahasa Arab: ", "")}`,
            pancaCinta: data.temaKbc.topikPancaCinta.split(" (")[0],
            durasi: "2 JP : 90 MENIT",
            pendahuluan: [
              "Mengawali pelajaran dengan salam hangat, doa, dan apersepsi.",
              "Mindful Moment: Memandu meditasi pernapasan 3 menit untuk menenangkan emosi murid.",
              "Menunjukkan tujuan belajar pertemuan hari ini."
            ],
            inti: [
              "Pemberian ulasan materi atau teks baru.",
              "Mendiskusikan implikasi pengetahuan dalam kehidupan sehari-hari.",
              "Mempraktikkan pemahaman secara berkelompok (Diferensiasi Proses)."
            ],
            penutup: [
              "Melakukan refleksi emosional pembelajaran dan kesimpulan nilai cinta.",
              "Menugaskan review mandiri.",
              "Doa penutup dan salam."
            ]
          });
        }
      } else if (diff < 0) {
        // Slice to new length
        currentLangkah = currentLangkah.slice(0, value);
      }
      
      onChange({
        ...data,
        identitas: updatedIdentitas,
        langkahLangkah: currentLangkah
      });
      return;
    }

    onChange({
      ...data,
      identitas: updatedIdentitas
    });
  };

  const handlePancaCintaChange = (value: string) => {
    onChange({
      ...data,
      temaKbc: {
        ...data.temaKbc,
        topikPancaCinta: value
      }
    });
  };

  const toggleDimensi = (dimensi: string) => {
    const exists = data.dimensiProfil.includes(dimensi);
    let updated: string[];
    if (exists) {
      updated = data.dimensiProfil.filter(d => d !== dimensi);
    } else {
      updated = [...data.dimensiProfil, dimensi];
    }
    onChange({
      ...data,
      dimensiProfil: updated
    });
  };

  const submitAiGeneration = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateAI(aiSubject, aiTopic, aiPancaCinta, aiMeetings);
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 shadow-xl border border-slate-800 space-y-6 no-print max-h-[85vh] overflow-y-auto custom-scrollbar">
      {/* HEADER BUILDER */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="text-emerald-400" size={20} />
          <div>
            <h2 className="text-sm font-bold text-slate-200 tracking-wide uppercase">Kontrol Generator RPP</h2>
            <p className="text-[10px] text-slate-400">Kurikulum Berbasis Cinta MAS Banu Hasyim</p>
          </div>
        </div>
        <button
          onClick={onReset}
          id="btn-form-reset"
          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition text-xs flex items-center gap-1.5 font-medium cursor-pointer"
          title="Reset ke RPP Usman (Bahasa Arab Olahraga)"
        >
          <RefreshCw size={12} />
          <span>Reset Default</span>
        </button>
      </div>

      {/* TABS / SECTIONS */}
      <div className="space-y-5">
        
        {/* 1. SEKTOR AI MAGIC GENERATOR */}
        <div className="bg-gradient-to-br from-emerald-950/40 to-indigo-950/30 border border-emerald-800/60 rounded-xl p-4 space-y-3">
          <button 
            type="button"
            onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
            className="w-full flex items-center justify-between text-left text-xs font-bold text-emerald-400 focus:outline-none cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="animate-pulse" size={14} />
              <span>DONGKRAK AI: BUAT RPP BARU</span>
            </span>
            <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded-full">
              {isAiPanelOpen ? "Tutup Panel" : "Buka Panel"}
            </span>
          </button>
          
          {isAiPanelOpen && (
            <form onSubmit={submitAiGeneration} className="space-y-3 pt-2 text-xs border-t border-emerald-800/30">
              <p className="text-[10px] text-slate-300 italic mb-2 leading-relaxed">
                Gunakan kecerdasan AI Gemini 3.5-Flash untuk merancang Modul Ajar (RPP) utuh topik lain dengan format KBC Indonesia.
              </p>
              
              <div>
                <label className="block text-[10px] text-slate-400 font-semibold mb-1 uppercase">Mata Pelajaran</label>
                <input
                  type="text"
                  value={aiSubject}
                  onChange={(e) => setAiSubject(e.target.value)}
                  placeholder="Contoh: Bahasa Arab, Biologi, Fiqih"
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-semibold mb-1 uppercase">Tema Bab / Judul Modul</label>
                <input
                  type="text"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="Contoh: Bab 2 - Kesehatan (الصحية)"
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-semibold mb-1 uppercase">Panca Cinta Utama</label>
                <select
                  value={aiPancaCinta}
                  onChange={(e) => setAiPancaCinta(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500 text-xs text-ellipsis"
                >
                  {OPTIONS_PANCA_CINTA.map((option, idx) => (
                    <option key={idx} value={option} className="bg-slate-900 text-slate-200">
                      {option.split(" (")[0]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-slate-400 font-semibold mb-1 uppercase">JTM (JP)</label>
                  <input
                    type="text"
                    value={`${aiMeetings * 2} JP`}
                    disabled
                    className="w-full bg-slate-950/50 border border-slate-800 rounded p-2 text-slate-400 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 font-semibold mb-1 uppercase">Jumlah Pertemuan</label>
                  <select
                    value={aiMeetings}
                    onChange={(e) => setAiMeetings(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500 text-xs"
                  >
                    {[2, 4, 6, 8, 10, 12].map((num) => (
                      <option key={num} value={num}>{num} Pertemuan</option>
                    ))}
                  </select>
                </div>
              </div>

              {aiError && (
                <div className="bg-rose-950/50 border border-rose-800 text-rose-200 p-2.5 rounded text-[11px] flex items-start gap-1.5 leading-snug">
                  <AlertCircle size={14} className="shrink-0 mt-0.5 text-rose-400" />
                  <span>{aiError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded font-bold transition flex items-center justify-center gap-1.5 cursor-pointer disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="animate-spin" size={14} />
                    <span>Mempersiapkan RPP KBC...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    <span>Generate RPP dengan AI</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* 2. IDENTITAS UTAMA */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase border-b border-slate-800 pb-1 flex items-center gap-1.5">
            <FileText size={12} />
            <span>Kustomisasi Identitas Modul</span>
          </h3>
          
          <div className="space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Mata Pelajaran</label>
                <input
                  type="text"
                  value={data.identitas.mataPelajaran}
                  onChange={(e) => handleIdentitasChange("mataPelajaran", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 focus:outline-none focus:border-slate-600"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Nama Penyusun (Guru)</label>
                <input
                  type="text"
                  value={data.identitas.namaPenyusun}
                  onChange={(e) => handleIdentitasChange("namaPenyusun", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 focus:outline-none focus:border-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 mb-1">Nama Madrasah</label>
              <input
                type="text"
                value={data.identitas.namaMadrasah}
                onChange={(e) => handleIdentitasChange("namaMadrasah", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 focus:outline-none focus:border-slate-600"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Kelas</label>
                <select
                  value={data.identitas.kelas}
                  onChange={(e) => handleIdentitasChange("kelas", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 focus:outline-none focus:border-slate-600"
                >
                  {OPTIONS_KELAS.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Fase</label>
                <select
                  value={data.identitas.fase}
                  onChange={(e) => handleIdentitasChange("fase", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 focus:outline-none focus:border-slate-600"
                >
                  {OPTIONS_FASE.map(f => <option key={f} value={f}>Fase {f}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Semester</label>
                <select
                  value={data.identitas.semester}
                  onChange={(e) => handleIdentitasChange("semester", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 focus:outline-none focus:border-slate-600"
                >
                  {OPTIONS_SEMESTER.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* JTM & PERTEMUAN SELCTION OPTIONS (REQUIRED) */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-2.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                <Clock size={10} />
                <span>Konfigurasi JTM & Pertemuan (Opsi)</span>
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-slate-500 mb-1">Alokasi JP</label>
                  <input
                    type="text"
                    disabled
                    value={data.identitas.alokasiWaktu.split(" (")[0]}
                    className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-slate-400 font-mono text-xs cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-1">Pertemuan Sesi</label>
                  <select
                    value={data.identitas.jumlahPertemuan}
                    onChange={(e) => handleIdentitasChange("jumlahPertemuan", Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-850 rounded p-1.5 focus:outline-none focus:border-slate-600"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => (
                      <option key={n} value={n}>{n} Sesi ({n * 2} JP)</option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-[9px] text-slate-400 italic">
                *Mengubah jumlah pertemuan otomatis menambah/memangkas agenda RPP per sesi di sebelah kanan.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Tahun Pelajaran</label>
                <input
                  type="text"
                  value={data.identitas.tahunPelajaran}
                  onChange={(e) => handleIdentitasChange("tahunPelajaran", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 focus:outline-none focus:border-slate-600"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Tempat & Tanggal</label>
                <input
                  type="text"
                  value={data.tandaTangan.tempatTanggal}
                  onChange={(e) => {
                    onChange({
                      ...data,
                      tandaTangan: { ...data.tandaTangan, tempatTanggal: e.target.value }
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 focus:outline-none focus:border-slate-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. PANCA CINTA (REQUIRED DROPDOWN) */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase border-b border-slate-800 pb-1 flex items-center gap-1.5">
            <Compass size={12} />
            <span>Fokus Panca Cinta KBC</span>
          </h3>
          <div className="space-y-1">
            <label className="block text-[10px] text-slate-500 font-semibold mb-1 uppercase">Panca Cinta Utama (Dropdown)</label>
            <select
              value={data.temaKbc.topikPancaCinta}
              onChange={(e) => handlePancaCintaChange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-850 rounded p-2 text-xs text-slate-100 focus:outline-none focus:border-slate-600"
            >
              {OPTIONS_PANCA_CINTA.map((opt, idx) => (
                <option key={idx} value={opt} className="bg-slate-900 text-slate-100">
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <p className="text-[10px] text-slate-400 leading-snug">
            Materi insersi dan nilai sportivitas tim diselaraskan dengan integrasi moral panca cinta pilihan Anda.
          </p>
        </div>

        {/* 4. DIMENSI PROFIL LULUSAN (REQUIRED DROPDOWN/SELECT) */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase border-b border-slate-800 pb-1 flex items-center gap-1.5">
            <Users size={12} />
            <span>Dimensi Profil Lulusan</span>
          </h3>
          <div className="space-y-2">
            <span className="block text-[10px] text-slate-500 font-semibold mb-1.5 uppercase">Opsi Pilihan Profil Lulusan</span>
            <div className="space-y-1.5 max-h-48 overflow-y-auto p-2 bg-slate-950 border border-slate-850 rounded custom-scrollbar">
              {OPTIONS_DIMENSI_PROFIL.map((dimensi, idx) => {
                const isSelected = data.dimensiProfil.includes(dimensi);
                return (
                  <label key={idx} className="flex items-start gap-2 text-[11px] text-slate-300 font-medium cursor-pointer hover:text-slate-100 py-0.5 select-none">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleDimensi(dimensi)}
                      className="mt-0.5 accent-emerald-500 rounded cursor-pointer"
                    />
                    <span>{dimensi}</span>
                  </label>
                );
              })}
            </div>
          </div>
          <p className="text-[10px] text-slate-400 leading-normal">
            *Ceklis elemen profil lulusan di atas untuk langsung disematkan secara otomatis di dokumen.
          </p>
        </div>

      </div>
    </div>
  );
};
