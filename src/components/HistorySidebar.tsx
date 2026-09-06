import React, { useRef } from "react";
import { ModulAjarData } from "../types";
import { History, Save, Trash2, FolderOpen, Download, Upload, Copy } from "lucide-react";

interface HistorySidebarProps {
  historyList: Array<{ id: string; judul: string; lastUpdated: string }>;
  currentId: string;
  onLoad: (id: string) => void;
  onSaveCurrent: (judulCustom?: string) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  onImport: (importedData: ModulAjarData) => void;
  data: ModulAjarData;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({
  historyList,
  currentId,
  onLoad,
  onSaveCurrent,
  onDelete,
  onImport,
  data
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportJson = () => {
    const filename = `${data.judul.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_rpp_kbc.json`;
    const jsonStr = JSON.stringify(data, null, 2);
    const element = document.createElement("a");
    const file = new Blob([jsonStr], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const files = e.target.files;
    if (files && files.length > 0) {
      fileReader.readAsText(files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && parsed.id && parsed.identitas && parsed.langkahLangkah) {
            onImport(parsed);
          } else {
            alert("File JSON tidak kompatibel dengan format Modul Ajar RPP KBC.");
          }
        } catch (err) {
          alert("Gagal membaca file JSON. Pastikan file valid.");
        }
      };
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-2xl p-5 shadow-xl space-y-5 no-print">
      {/* Title */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <History className="text-emerald-400" size={18} />
        <div>
          <h3 className="text-xs font-bold tracking-wider uppercase text-slate-200">Arsip & Riwayat Modul</h3>
          <p className="text-[10px] text-slate-400">Kelola dan Backup Rencana Ajar Anda</p>
        </div>
      </div>

      {/* Save Action */}
      <div className="space-y-2">
        <button
          onClick={() => {
            const defaultName = `RPP ${data.identitas.mataPelajaran} - ${data.judul.replace("Modul Ajar Bahasa Arab: ", "")}`;
            const customTitle = prompt("Masukkan nama arsip untuk RPP ini:", defaultName);
            if (customTitle !== null) {
              onSaveCurrent(customTitle || undefined);
            }
          }}
          className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs py-2 px-3 rounded-lg font-bold cursor-pointer border border-slate-700 transition"
        >
          <Save size={13} className="text-emerald-400" />
          <span>Simpan Draft Kali Ini</span>
        </button>
      </div>

      {/* History List */}
      <div className="space-y-2.5">
        <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-widest block flex items-center gap-1.5 mb-1.5">
          <FolderOpen size={11} />
          <span>Daftar Modul Anda ({historyList.length})</span>
        </span>
        
        {historyList.length === 0 ? (
          <div className="text-center py-6 border border-dashed border-slate-800 rounded-lg text-slate-500 text-[11px] leading-relaxed">
            Belum ada arsip disimpan. Klik tombol di atas untuk menyimpan RPP ini ke penyimpanan lokal browser Anda.
          </div>
        ) : (
          <div className="space-y-1.5 max-h-44 overflow-y-auto custom-scrollbar pr-1 bg-slate-950/45 p-1 rounded-xl border border-slate-850">
            {historyList.map((item) => {
              const isActive = item.id === currentId;
              return (
                <div
                  key={item.id}
                  onClick={() => onLoad(item.id)}
                  className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer transition select-none ${
                    isActive 
                      ? "bg-slate-800 text-white border border-slate-700" 
                      : "bg-slate-900/60 hover:bg-slate-850 text-slate-300 border border-transparent"
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-[11px] font-bold truncate leading-tight">{item.judul}</p>
                    <p className="text-[9px] text-slate-500 font-mono mt-0.5">{item.lastUpdated}</p>
                  </div>
                  <button
                    onClick={(e) => onDelete(item.id, e)}
                    className="p-1 text-slate-500 hover:text-rose-400 rounded hover:bg-slate-800 opacity-80 group-hover:opacity-100 transition duration-150 cursor-pointer"
                    title="Hapus RPP"
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* File Backup Import/Export */}
      <div className="border-t border-slate-800 pt-4 space-y-2 text-xs">
        <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-widest block flex items-center gap-1.5 mb-1.5">
          <Download size={11} />
          <span>Cadangan Sesi Fisik</span>
        </span>
        
        <div className="grid grid-cols-2 gap-2">
          {/* Export */}
          <button
            onClick={handleExportJson}
            className="flex items-center justify-center gap-1.5 bg-slate-950 hover:bg-slate-900 text-[11px] font-medium py-2 rounded border border-slate-800 cursor-pointer"
            title="Download RPP dalam file JSON"
          >
            <Download size={12} className="text-emerald-400" />
            <span>Ekspor JSON</span>
          </button>

          {/* Import Button Trigger */}
          <button
            onClick={() => fileInputRef.current?.click()}
            type="button"
            className="flex items-center justify-center gap-1.5 bg-slate-950 hover:bg-slate-900 text-[11px] font-medium py-2 rounded border border-slate-800 cursor-pointer"
            title="Upload file JSON RPP sebelumnya"
          >
            <Upload size={12} className="text-emerald-400" />
            <span>Impor JSON</span>
          </button>
        </div>

        {/* Hidden Import Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImportJsonFile}
          accept=".json,application/json"
          className="hidden"
        />
      </div>
    </div>
  );
};
