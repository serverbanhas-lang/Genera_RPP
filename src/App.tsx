import React, { useState, useEffect } from "react";
import { ModulAjarData } from "./types";
import { DEFAULT_MODUL_AJAR } from "./defaultData";
import { FormPanel } from "./components/FormPanel";
import { RppDoc } from "./components/RppDoc";
import { HistorySidebar } from "./components/HistorySidebar";
import { Printer, BookOpen, Compass, FileSpreadsheet, Sparkles, HelpCircle } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  const [activeRpp, setActiveRpp] = useState<ModulAjarData>(DEFAULT_MODUL_AJAR);
  const [historyList, setHistoryList] = useState<Array<{ id: string; judul: string; lastUpdated: string }>>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isEditingInline, setIsEditingInline] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Load history metadata and active RPP on startup
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem("rpp_kbc_history");
      if (storedHistory) {
        setHistoryList(JSON.parse(storedHistory));
      } else {
        // Save default into history list initially if first load
        const initHistory = [{
          id: DEFAULT_MODUL_AJAR.id,
          judul: DEFAULT_MODUL_AJAR.judul,
          lastUpdated: new Date().toLocaleString("id-ID")
        }];
        localStorage.setItem("rpp_kbc_history", JSON.stringify(initHistory));
        localStorage.setItem(`rpp_kbc_doc_${DEFAULT_MODUL_AJAR.id}`, JSON.stringify(DEFAULT_MODUL_AJAR));
        setHistoryList(initHistory);
      }

      const activeId = localStorage.getItem("rpp_kbc_active_id") || DEFAULT_MODUL_AJAR.id;
      const storedActiveDoc = localStorage.getItem(`rpp_kbc_doc_${activeId}`);
      if (storedActiveDoc) {
        setActiveRpp(JSON.parse(storedActiveDoc));
      } else {
        setActiveRpp(DEFAULT_MODUL_AJAR);
      }
    } catch (e) {
      console.warn("Storage reading error, using default data.", e);
    }
  }, []);

  // Save current RPP progress to local storage on change
  const handleRppChange = (updated: ModulAjarData) => {
    setActiveRpp(updated);
    try {
      localStorage.setItem(`rpp_kbc_doc_${updated.id}`, JSON.stringify(updated));
      localStorage.setItem("rpp_kbc_active_id", updated.id);
      
      // Update entry in history list title if it changed
      const updatedHistory = historyList.map(item => {
        if (item.id === updated.id) {
          return {
            ...item,
            judul: updated.judul,
            lastUpdated: new Date().toLocaleString("id-ID")
          };
        }
        return item;
      });
      setHistoryList(updatedHistory);
      localStorage.setItem("rpp_kbc_history", JSON.stringify(updatedHistory));
    } catch (e) {
      console.warn("Failed to save changes to storage", e);
    }
  };

  // Reset to Usman's default Bahasa Arab - Olahraga
  const handleReset = () => {
    if (window.confirm("Apakah Anda yakin ingin menyetel ulang modul ini ke template default RPP Bahasa Arab (Al-Riyadhah)?")) {
      setActiveRpp(DEFAULT_MODUL_AJAR);
      setIsEditingInline(false);
      try {
        localStorage.setItem(`rpp_kbc_doc_${DEFAULT_MODUL_AJAR.id}`, JSON.stringify(DEFAULT_MODUL_AJAR));
        localStorage.setItem("rpp_kbc_active_id", DEFAULT_MODUL_AJAR.id);
        
        // Ensure default is represented in list
        const exists = historyList.some(item => item.id === DEFAULT_MODUL_AJAR.id);
        let newList = [...historyList];
        if (!exists) {
          newList.push({
            id: DEFAULT_MODUL_AJAR.id,
            judul: DEFAULT_MODUL_AJAR.judul,
            lastUpdated: new Date().toLocaleString("id-ID")
          });
        } else {
          newList = newList.map(item => {
            if (item.id === DEFAULT_MODUL_AJAR.id) {
              return {
                ...item,
                judul: DEFAULT_MODUL_AJAR.judul,
                lastUpdated: new Date().toLocaleString("id-ID")
              };
            }
            return item;
          });
        }
        setHistoryList(newList);
        localStorage.setItem("rpp_kbc_history", JSON.stringify(newList));
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Save current as a duplicate or new draft
  const handleSaveCurrentCopy = (customTitle?: string) => {
    const finalTitle = customTitle || `Draft RPP: ${activeRpp.identitas.mataPelajaran} - ${activeRpp.judul}`;
    const newId = `rpp-custom-${Date.now()}`;
    const timestamp = new Date().toLocaleString("id-ID");
    
    const newDocObj: ModulAjarData = {
      ...activeRpp,
      id: newId,
      judul: finalTitle
    };

    try {
      localStorage.setItem(`rpp_kbc_doc_${newId}`, JSON.stringify(newDocObj));
      localStorage.setItem("rpp_kbc_active_id", newId);
      
      const newHistoryItem = {
        id: newId,
        judul: finalTitle,
        lastUpdated: timestamp
      };
      const updatedHistory = [newHistoryItem, ...historyList];
      setHistoryList(updatedHistory);
      localStorage.setItem("rpp_kbc_history", JSON.stringify(updatedHistory));
      setActiveRpp(newDocObj);
    } catch (e) {
      alert("Gagal menyimpan ke memori lokal browser. Periksa kuota memori.");
    }
  };

  // Load a stored RPP by ID
  const handleLoadRpp = (id: string) => {
    try {
      const stored = localStorage.getItem(`rpp_kbc_doc_${id}`);
      if (stored) {
        setActiveRpp(JSON.parse(stored));
        localStorage.setItem("rpp_kbc_active_id", id);
      }
    } catch (e) {
      console.warn("Could not load document", e);
    }
  };

  // Delete an RPP from history
  const handleDeleteRpp = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (id === DEFAULT_MODUL_AJAR.id) {
      alert("Format default RPP Bahasa Arab (Al-Riyadhah) tidak dapat dihapus!");
      return;
    }
    
    if (window.confirm("Hapus modul RPP ajar ini dari penyimpanan?")) {
      try {
        localStorage.removeItem(`rpp_kbc_doc_${id}`);
        const newList = historyList.filter(item => item.id !== id);
        setHistoryList(newList);
        localStorage.setItem("rpp_kbc_history", JSON.stringify(newList));
        
        // If we deleted the active one, fallback to the default
        if (activeRpp.id === id) {
          handleLoadRpp(DEFAULT_MODUL_AJAR.id);
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  // Handle file JSON imports
  const handleImportRpp = (importedData: ModulAjarData) => {
    const timestamp = new Date().toLocaleString("id-ID");
    try {
      // Ensure has a unique ID
      const newId = `imported-${Date.now()}`;
      const finalObj = { ...importedData, id: newId };
      
      localStorage.setItem(`rpp_kbc_doc_${newId}`, JSON.stringify(finalObj));
      localStorage.setItem("rpp_kbc_active_id", newId);
      
      const newListItem = {
        id: newId,
        judul: `${finalObj.judul} (Impor)`,
        lastUpdated: timestamp
      };
      
      const newList = [newListItem, ...historyList];
      setHistoryList(newList);
      localStorage.setItem("rpp_kbc_history", JSON.stringify(newList));
      setActiveRpp(finalObj);
      alert("Modul Ajar KBC berhasil dimuat dari file JSON cadangan!");
    } catch (e) {
      alert("Gagal mengimpor RPP.");
    }
  };

  // Call the server-side proxy endpoint to generate dynamic KBC plans via Gemini
  const handleGenerateWithAI = async (
    subject: string,
    topic: string,
    pancaCinta: string,
    meetings: number
  ) => {
    setIsGenerating(true);
    setAiError(null);
    try {
      const response = await fetch("/api/generate-rpp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mataPelajaran: subject,
          bab: topic,
          kelas: activeRpp.identitas.kelas,
          fase: activeRpp.identitas.fase,
          semester: activeRpp.identitas.semester,
          alokasiWaktu: `${meetings * 2} JP (${meetings} kali pertemuan)`,
          jumlahPertemuan: meetings,
          tahunPelajaran: activeRpp.identitas.tahunPelajaran,
          topikPancaCinta: pancaCinta,
          namaPenyusun: activeRpp.identitas.namaPenyusun,
          namaMadrasah: activeRpp.identitas.namaMadrasah
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Gagal menghubungi server generator.");
      }

      const generatedData: ModulAjarData = await response.json();
      
      // Inject some metadata and set state
      const newId = `rpp-ai-gen-${Date.now()}`;
      generatedData.id = newId;
      generatedData.judul = `RPP AI: ${subject} - ${topic}`;
      
      localStorage.setItem(`rpp_kbc_doc_${newId}`, JSON.stringify(generatedData));
      localStorage.setItem("rpp_kbc_active_id", newId);

      const listHeader = {
        id: newId,
        judul: generatedData.judul,
        lastUpdated: new Date().toLocaleString("id-ID")
      };

      const newList = [listHeader, ...historyList];
      setHistoryList(newList);
      localStorage.setItem("rpp_kbc_history", JSON.stringify(newList));
      setActiveRpp(generatedData);
      
      alert(`Berhasil membuat RPP KBC Baru untuk ${subject}: ${topic}!`);
    } catch (err: any) {
      setAiError(err.message || "An error occurred during generation. Check your Gemini API Secret key config.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Trigger Print dialog
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white print:bg-white print:min-h-0">
      {/* Outer CSS Print Overrides */}
      <style>{`
        @media print {
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact;
          }
          /* Hide non-printable outer frames */
          .no-print, header, aside, .no-print-area {
            display: none !important;
          }
          /* Setup perfect margins for printable modular RPP sheet */
          #rpp-printable-document {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: none !important;
            border-radius: 0 !important;
          }
          /* Force page break properties */
          .page-break {
            page-break-before: always;
            break-before: page;
          }
        }
      `}</style>

      {/* TOP DESKTOP ACTION BAR */}
      <header className="no-print bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: -15, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-black text-lg shadow-md"
          >
            KBC
          </motion.div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
              <span>Generator RPP Deep Learning KBC</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">
              Sistem Kurikulum Berbasis Cinta (KBC) • MAS BANU HASYIM MOJOSARI
            </p>
          </div>
        </div>

        {/* Quick Utilities */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="hidden md:flex text-right flex-col mr-2">
            <span className="text-[10px] text-slate-400">Guru Aktif:</span>
            <span className="text-xs font-semibold text-slate-200">{activeRpp.identitas.namaPenyusun}</span>
          </div>
          
          <button
            onClick={handlePrint}
            id="btn-rpp-print"
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-lg border border-emerald-500 transition cursor-pointer"
          >
            <Printer size={14} />
            <span>Cetak / Ekspor PDF</span>
          </button>
        </div>
      </header>

      {/* WORKSPACE FRAME (Two Columns: Inputs Left, Live Doc Preview Right) */}
      <div className="flex-1 max-w-[1400px] w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 print:block print:p-0">
        
        {/* LEFT COLUMN: CONTROLLER DRAWER */}
        <aside className="no-print lg:col-span-4 xl:col-span-4 space-y-6 flex flex-col">
          {/* Main Controls Input */}
          <FormPanel
            data={activeRpp}
            onChange={handleRppChange}
            onReset={handleReset}
            onGenerateAI={handleGenerateWithAI}
            isGenerating={isGenerating}
            aiError={aiError}
          />
          
          {/* History Metadata List */}
          <HistorySidebar
            historyList={historyList}
            currentId={activeRpp.id}
            onLoad={handleLoadRpp}
            onSaveCurrent={handleSaveCurrentCopy}
            onDelete={handleDeleteRpp}
            onImport={handleImportRpp}
            data={activeRpp}
          />

          {/* Guidelines info card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2.5 text-slate-600 leading-normal">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide text-[10px]">
              <HelpCircle size={12} className="text-slate-500" />
              <span>Petunjuk Guru</span>
            </h4>
            <p>
              Modul RPP ajar ini menggunakan pola <strong className="text-slate-800">Deep Learning</strong> dengan metode <strong className="text-indigo-600">Mindful, Meaningful, & Joyful Learning</strong> yang bertujuan mengintegrasikan kecintaan siswa pada diri, lingkungan, sesama, dan agama.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[11px]">
              <li>Gunakan tombol <strong className="text-slate-800">Edit Konten Langsung</strong> di pojok kanan RPP untuk mengetik teks baru langsung pada lembaran cetak.</li>
              <li>Tarik dropdown <strong className="text-emerald-600">Daftar Pertemuan</strong> untuk otomatis mengatur rancangan sesi belajar.</li>
              <li>Simpan progres draft Anda dan ekspor file mentahan sebagai JSON jika sewaktu-waktu ingin dibuka di gawai lainnya.</li>
            </ul>
          </div>
        </aside>

        {/* RIGHT COLUMN: LIVE WORKSPACE PRINTABLE DOCUMENT */}
        <main className="lg:col-span-8 xl:col-span-8 overflow-x-auto select-text flex items-start justify-center print:block print:overflow-visible print:w-full">
          <RppDoc
            data={activeRpp}
            onChange={handleRppChange}
            isEditingInline={isEditingInline}
            onToggleInlineEdit={() => setIsEditingInline(!isEditingInline)}
          />
        </main>
      </div>

      {/* FOOTER */}
      <footer className="no-print bg-slate-900 text-slate-500 border-t border-slate-850 px-6 py-4 text-center text-[11px] font-medium uppercase tracking-wider">
        Copyright © {new Date().getFullYear()} MAS BANU HASYIM • Desain Kurikulum Cinta Deep Learning KBC
      </footer>
    </div>
  );
}
