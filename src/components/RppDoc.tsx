import React from "react";
import { ModulAjarData } from "../types";
import { Check, Edit3, Trash2, Plus } from "lucide-react";

interface RppDocProps {
  data: ModulAjarData;
  onChange: (updatedData: ModulAjarData) => void;
  isEditingInline: boolean;
  onToggleInlineEdit: () => void;
}

export const RppDoc: React.FC<RppDocProps> = ({
  data,
  onChange,
  isEditingInline,
  onToggleInlineEdit
}) => {
  // Helpers to update deeply nested fields inline
  const updateIdentitas = (field: keyof ModulAjarData["identitas"], value: any) => {
    onChange({
      ...data,
      identitas: { ...data.identitas, [field]: value }
    });
  };

  const updateKesiapan = (field: keyof ModulAjarData["kesiapanPeserta"], value: any) => {
    onChange({
      ...data,
      kesiapanPeserta: { ...data.kesiapanPeserta, [field]: value }
    });
  };

  const updateKebutuhanBelajar = (field: keyof ModulAjarData["kesiapanPeserta"]["kebutuhanBelajar"], value: string) => {
    onChange({
      ...data,
      kesiapanPeserta: {
        ...data.kesiapanPeserta,
        kebutuhanBelajar: { ...data.kesiapanPeserta.kebutuhanBelajar, [field]: value }
      }
    });
  };

  const updateKarakteristik = (field: keyof ModulAjarData["karakteristikMateri"], value: any) => {
    onChange({
      ...data,
      karakteristikMateri: { ...data.karakteristikMateri, [field]: value }
    });
  };

  const updateTandaTangan = (field: keyof ModulAjarData["tandaTangan"], value: string) => {
    onChange({
      ...data,
      tandaTangan: { ...data.tandaTangan, [field]: value }
    });
  };

  // CP Table Helper
  const handleCpChange = (id: string, text: string) => {
    onChange({
      ...data,
      capaianPembelajaran: data.capaianPembelajaran.map(cp => 
        cp.id === id ? { ...cp, deskripsi: text } : cp
      )
    });
  };

  // Tujuan Pembelajaran Helper
  const handleTpChange = (id: string, text: string) => {
    onChange({
      ...data,
      tujuanPembelajaran: data.tujuanPembelajaran.map(tp =>
        tp.id === id ? { ...tp, deskripsi: text } : tp
      )
    });
  };

  // Lintas Disiplin Helper
  const handleLintasDisiplinChange = (index: number, text: string) => {
    const updated = [...data.lintasDisiplin];
    updated[index] = text;
    onChange({ ...data, lintasDisiplin: updated });
  };

  // Indikator Helper
  const handleIndikatorChange = (index: number, text: string) => {
    const updated = [...data.indikatorKetercapaian];
    updated[index] = text;
    onChange({ ...data, indikatorKetercapaian: updated });
  };

  // Langkah Pertemuan Helper
  const handleLangkahSectionChange = (
    langkahId: string,
    section: "pendahuluan" | "inti" | "penutup",
    itemIndex: number,
    text: string
  ) => {
    onChange({
      ...data,
      langkahLangkah: data.langkahLangkah.map(langkah => {
        if (langkah.id === langkahId) {
          const updatedSection = [...langkah[section]];
          updatedSection[itemIndex] = text;
          return { ...langkah, [section]: updatedSection };
        }
        return langkah;
      })
    });
  };

  // Add/Remove array helpers for inline editing
  const addLangkahItem = (langkahId: string, section: "pendahuluan" | "inti" | "penutup") => {
    onChange({
      ...data,
      langkahLangkah: data.langkahLangkah.map(l => {
        if (l.id === langkahId) {
          return { ...l, [section]: [...l[section], "Langkah baru..."] };
        }
        return l;
      })
    });
  };

  const removeLangkahItem = (langkahId: string, section: "pendahuluan" | "inti" | "penutup", index: number) => {
    onChange({
      ...data,
      langkahLangkah: data.langkahLangkah.map(l => {
        if (l.id === langkahId) {
          return { ...l, [section]: l[section].filter((_, i) => i !== index) };
        }
        return l;
      })
    });
  };

  const addMateriInsersi = () => {
    onChange({
      ...data,
      temaKbc: {
        ...data.temaKbc,
        materiInsersi: [...data.temaKbc.materiInsersi, "Materi insersi panca cinta baru..."]
      }
    });
  };

  const removeMateriInsersi = (index: number) => {
    onChange({
      ...data,
      temaKbc: {
        ...data.temaKbc,
        materiInsersi: data.temaKbc.materiInsersi.filter((_, i) => i !== index)
      }
    });
  };

  return (
    <div className="relative bg-white text-gray-800 shadow-2xl rounded-2xl border border-gray-100 p-8 md:p-12 min-h-[297mm] w-full max-w-[210mm] mx-auto transition-all print:shadow-none print:border-none print:p-0 print:mx-0 print:max-w-none print:bg-white" id="rpp-printable-document">
      {/* Inline Edit Float-Button */}
      <button
        onClick={onToggleInlineEdit}
        id="btn-edit-inline-toggle"
        className="no-print absolute top-6 right-6 flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition shadow-sm"
      >
        {isEditingInline ? (
          <>
            <Check size={14} className="text-emerald-600" />
            <span>Selesai Edit</span>
          </>
        ) : (
          <>
            <Edit3 size={14} />
            <span>Edit Konten Langsung</span>
          </>
        )}
      </button>

      {/* HEADER KOP MADRASAH */}
      <div className="flex flex-col items-center text-center border-b-[3px] border-slate-800 pb-3 mb-6">
        <h2 className="font-sans text-xl font-bold tracking-tight text-slate-900 uppercase">
          {data.identitas.namaMadrasah}
        </h2>
        <p className="font-sans text-xs tracking-wider text-slate-500 font-medium uppercase">
          MODUL AJAR DEEP LEARNING (KURIKULUM BERBASIS CINTA - KBC)
        </p>
        <div className="flex gap-4 text-[10px] text-gray-400 font-mono mt-1">
          <span>TAHUN AJARAN: {data.identitas.tahunPelajaran}</span>
          <span>•</span>
          <span>MATA PELAJARAN: {data.identitas.mataPelajaran.toUpperCase()}</span>
        </div>
      </div>

      {/* RPP TITLE */}
      <div className="text-center mb-8">
        <h1 className="font-sans text-lg font-bold uppercase tracking-wide text-slate-900">
          MODUL AJAR / RENCANA PELAKSANAAN PEMBELAJARAN
        </h1>
        <p className="font-sans text-sm text-slate-600 font-medium mt-1">
          Mata Pelajaran: {data.identitas.mataPelajaran} | Bab: {data.judul.replace("Modul Ajar Bahasa Arab: ", "")}
        </p>
      </div>

      {/* MAIN DOCUMENT SECTIONS */}

      {/* A. IDENTITAS MODUL */}
      <section className="mb-6 break-inside-avoid">
        <h3 className="font-sans text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded uppercase tracking-wider mb-3">
          A. IDENTITAS MODUL
        </h3>
        <table className="w-full text-xs" id="table-identitas-modul">
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-2.5 font-semibold text-slate-600 w-1/3">Nama Madrasah</td>
              <td className="py-2.5 text-gray-500 w-11/12">
                {isEditingInline ? (
                  <input
                    type="text"
                    value={data.identitas.namaMadrasah}
                    onChange={(e) => updateIdentitas("namaMadrasah", e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-0.5"
                  />
                ) : (
                  data.identitas.namaMadrasah
                )}
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2.5 font-semibold text-slate-600">Nama Penyusun</td>
              <td className="py-2.5 text-slate-800 font-medium">
                {isEditingInline ? (
                  <input
                    type="text"
                    value={data.identitas.namaPenyusun}
                    onChange={(e) => updateIdentitas("namaPenyusun", e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-0.5"
                  />
                ) : (
                  data.identitas.namaPenyusun
                )}
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2.5 font-semibold text-slate-600">Mata Pelajaran</td>
              <td className="py-2.5">
                {isEditingInline ? (
                  <input
                    type="text"
                    value={data.identitas.mataPelajaran}
                    onChange={(e) => updateIdentitas("mataPelajaran", e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-0.5"
                  />
                ) : (
                  data.identitas.mataPelajaran
                )}
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2.5 font-semibold text-slate-600">Kelas / Fase / Semester</td>
              <td className="py-2.5">
                {data.identitas.kelas} / Fase {data.identitas.fase} / {data.identitas.semester}
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2.5 font-semibold text-slate-600">Alokasi Waktu</td>
              <td className="py-2.5 font-mono text-xs">
                {data.identitas.alokasiWaktu}
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2.5 font-semibold text-slate-600">Tahun Pelajaran</td>
              <td className="py-2.5">
                {isEditingInline ? (
                  <input
                    type="text"
                    value={data.identitas.tahunPelajaran}
                    onChange={(e) => updateIdentitas("tahunPelajaran", e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-0.5"
                  />
                ) : (
                  data.identitas.tahunPelajaran
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* B. IDENTIFIKASI KESIAPAN PESERTA DIDIK */}
      <section className="mb-6 break-inside-avoid">
        <h3 className="font-sans text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded uppercase tracking-wider mb-3">
          B. IDENTIFIKASI KESIAPAN PESERTA DIDIK
        </h3>
        <div className="space-y-3.5 text-xs">
          <div>
            <span className="font-semibold text-slate-700 block mb-1">● Pengetahuan Awal:</span>
            {isEditingInline ? (
              <textarea
                value={data.kesiapanPeserta.pengetahuanAwal}
                onChange={(e) => updateKesiapan("pengetahuanAwal", e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
                rows={2}
              />
            ) : (
              <p className="text-gray-600 text-justify leading-relaxed">{data.kesiapanPeserta.pengetahuanAwal}</p>
            )}
          </div>
          <div>
            <span className="font-semibold text-slate-700 block mb-1">● Minat:</span>
            {isEditingInline ? (
              <textarea
                value={data.kesiapanPeserta.minat}
                onChange={(e) => updateKesiapan("minat", e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
                rows={2}
              />
            ) : (
              <p className="text-gray-600 text-justify leading-relaxed">{data.kesiapanPeserta.minat}</p>
            )}
          </div>
          <div>
            <span className="font-semibold text-slate-700 block mb-1">● Latar Belakang:</span>
            {isEditingInline ? (
              <textarea
                value={data.kesiapanPeserta.latarBelakang}
                onChange={(e) => updateKesiapan("latarBelakang", e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
                rows={2}
              />
            ) : (
              <p className="text-gray-600 text-justify leading-relaxed">{data.kesiapanPeserta.latarBelakang}</p>
            )}
          </div>
          <div>
            <span className="font-semibold text-slate-700 block mb-1.5">● Kebutuhan Belajar:</span>
            <div className="grid grid-cols-1 gap-2.5 pl-3 border-l-2 border-slate-200">
              <div>
                <span className="font-semibold text-slate-600">Visual:</span>{" "}
                {isEditingInline ? (
                  <input
                    type="text"
                    value={data.kesiapanPeserta.kebutuhanBelajar.visual}
                    onChange={(e) => updateKebutuhanBelajar("visual", e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-0.5 mt-0.5"
                  />
                ) : (
                  <span className="text-gray-600">{data.kesiapanPeserta.kebutuhanBelajar.visual}</span>
                )}
              </div>
              <div>
                <span className="font-semibold text-slate-600">Auditori:</span>{" "}
                {isEditingInline ? (
                  <input
                    type="text"
                    value={data.kesiapanPeserta.kebutuhanBelajar.auditori}
                    onChange={(e) => updateKebutuhanBelajar("auditori", e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-0.5 mt-0.5"
                  />
                ) : (
                  <span className="text-gray-600">{data.kesiapanPeserta.kebutuhanBelajar.auditori}</span>
                )}
              </div>
              <div>
                <span className="font-semibold text-slate-600">Kinestetik:</span>{" "}
                {isEditingInline ? (
                  <input
                    type="text"
                    value={data.kesiapanPeserta.kebutuhanBelajar.kinestetik}
                    onChange={(e) => updateKebutuhanBelajar("kinestetik", e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-0.5 mt-0.5"
                  />
                ) : (
                  <span className="text-gray-600">{data.kesiapanPeserta.kebutuhanBelajar.kinestetik}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* C. TEMA KURIKULUM BERBASIS CINTA */}
      <section className="mb-6 break-inside-avoid">
        <h3 className="font-sans text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded uppercase tracking-wider mb-3">
          C. TEMA KURIKULUM BERBASIS CINTA (KBC)
        </h3>
        <div className="space-y-2.5 text-xs">
          <div>
            <span className="font-semibold text-slate-700 block mb-1">● Topik Panca Cinta:</span>
            <p className="text-emerald-700 font-medium pl-3 border-l-2 border-emerald-500 py-0.5 bg-emerald-50/20 rounded-r">
              {data.temaKbc.topikPancaCinta}
            </p>
          </div>
          <div>
            <span className="font-semibold text-slate-700 block mb-1">● Materi Insersi Nilai Cinta:</span>
            <ul className="list-disc pl-5 text-gray-600 space-y-1.5 text-justify leading-relaxed">
              {data.temaKbc.materiInsersi.map((materi, idx) => (
                <li key={idx} className="group min-h-[24px]">
                  {isEditingInline ? (
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="text"
                        value={materi}
                        onChange={(e) => {
                          const updated = [...data.temaKbc.materiInsersi];
                          updated[idx] = e.target.value;
                          onChange({ ...data, temaKbc: { ...data.temaKbc, materiInsersi: updated } });
                        }}
                        className="flex-1 border border-gray-300 rounded px-2 py-0.5"
                      />
                      <button
                        onClick={() => removeMateriInsersi(idx)}
                        className="p-1 text-rose-500 hover:bg-rose-50 rounded cursor-pointer no-print"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ) : (
                    materi
                  )}
                </li>
              ))}
            </ul>
            {isEditingInline && (
              <button
                onClick={addMateriInsersi}
                className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-600 hover:text-emerald-700 font-medium no-print cursor-pointer"
              >
                <Plus size={12} />
                <span>Tambah Materi Insersi</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* D. KARAKTERISTIK MATERI PELAJARAN */}
      <section className="mb-6 break-inside-avoid">
        <h3 className="font-sans text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded uppercase tracking-wider mb-3">
          D. KARAKTERISTIK MATERI PELAJARAN
        </h3>
        <div className="space-y-3.5 text-xs">
          <div>
            <span className="font-semibold text-slate-700 block mb-1">● Jenis Pengetahuan yang Akan Dicapai:</span>
            <div className="pl-3 border-l-2 border-gray-200 py-1 space-y-2">
              <p className="text-gray-600 text-justify">
                <strong className="text-slate-700">Konseptual:</strong>{" "}
                {isEditingInline ? (
                  <textarea
                    value={data.karakteristikMateri.konseptual}
                    onChange={(e) => updateKarakteristik("konseptual", e.target.value)}
                    className="w-full border border-gray-300 rounded p-1.5 text-xs"
                    rows={2}
                  />
                ) : (
                  data.karakteristikMateri.konseptual
                )}
              </p>
              <p className="text-gray-600 text-justify">
                <strong className="text-slate-700">Prosedural:</strong>{" "}
                {isEditingInline ? (
                  <textarea
                    value={data.karakteristikMateri.prosedural}
                    onChange={(e) => updateKarakteristik("prosedural", e.target.value)}
                    className="w-full border border-gray-300 rounded p-1.5 text-xs"
                    rows={2}
                  />
                ) : (
                  data.karakteristikMateri.prosedural
                )}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-slate-700 block mb-1">● Relevansi dengan Kehidupan Nyata:</span>
              {isEditingInline ? (
                <textarea
                  value={data.karakteristikMateri.relevansi}
                  onChange={(e) => updateKarakteristik("relevansi", e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 text-xs"
                  rows={2}
                />
              ) : (
                <p className="text-gray-600 leading-relaxed text-justify">{data.karakteristikMateri.relevansi}</p>
              )}
            </div>
            <div>
              <span className="font-semibold text-slate-700 block mb-1">● Tingkat Kesulitan:</span>
              <p className="text-gray-600">
                Tingkat kesulitan materi ini diklasifikasikan sebagai{" "}
                <span className="font-mono bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded font-bold text-[10px]">
                  {data.karakteristikMateri.tingkatKesulitan.toUpperCase()}
                </span>.
              </p>
            </div>
          </div>
          <div>
            <span className="font-semibold text-slate-700 block mb-1">● Struktur Alur Materi:</span>
            {isEditingInline ? (
              <textarea
                value={data.karakteristikMateri.strukturMateri}
                onChange={(e) => updateKarakteristik("strukturMateri", e.target.value)}
                className="w-full border border-gray-300 rounded p-2 text-xs"
                rows={2}
              />
            ) : (
              <p className="text-gray-600 leading-relaxed text-justify">{data.karakteristikMateri.strukturMateri}</p>
            )}
          </div>
          <div>
            <span className="font-semibold text-slate-700 block mb-1">● Integrasi Nilai & Karakter Mulia:</span>
            {isEditingInline ? (
              <textarea
                value={data.karakteristikMateri.integrasiNilai}
                onChange={(e) => updateKarakteristik("integrasiNilai", e.target.value)}
                className="w-full border border-gray-300 rounded p-2 text-xs"
                rows={2}
              />
            ) : (
              <p className="text-gray-600 leading-relaxed text-justify text-emerald-800/90 font-medium">
                {data.karakteristikMateri.integrasiNilai}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* E. DIMENSI PROFIL LULUSAN */}
      <section className="mb-6 break-inside-avoid">
        <h3 className="font-sans text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded uppercase tracking-wider mb-3">
          E. DIMENSI PROFIL LULUSAN
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-600 leading-relaxed">
          {data.dimensiProfil.map((dimensi, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>
                <strong className="text-slate-700 font-semibold">{dimensi.split(":")[0]}</strong>
                {dimensi.includes(":") ? `:${dimensi.split(":")[1]}` : ""}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="page-break print:block" style={{ pageBreakBefore: "always" }}></div>

      {/* DESAIN PEMBELAJARAN SECTIONS */}
      <div className="text-center font-sans border-b-2 border-double border-slate-700 pb-2 mb-6 mt-4 print:mt-0">
        <h2 className="text-sm font-bold tracking-widest text-slate-900 uppercase">
          DESAIN PEMBELAJARAN
        </h2>
      </div>

      {/* A. CAPAIAN PEMBELAJARAN (CP) - REQUIRED TABLE */}
      <section className="mb-6 break-inside-avoid">
        <h3 className="font-sans text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded uppercase tracking-wider mb-3">
          A. TABEL CAPAIAN PEMBELAJARAN (CP) FASE F
        </h3>
        <table className="w-full border-collapse border border-slate-400 text-[11px]" id="table-capaian-pembelajaran">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="border border-slate-400 px-2 py-2 text-left font-sans font-bold w-1/4">Elemen</th>
              <th className="border border-slate-400 px-2 py-2 text-left font-sans font-bold w-3/4">Deskripsi Capaian Pembelajaran</th>
            </tr>
          </thead>
          <tbody>
            {data.capaianPembelajaran.map((cp) => (
              <tr key={cp.id} className="align-top hover:bg-slate-50/50">
                <td className="border border-slate-400 px-2.5 py-3 font-sans font-semibold text-slate-700">
                  {cp.elemen}
                </td>
                <td className="border border-slate-400 px-2.5 py-3 text-gray-600 leading-relaxed text-justify">
                  {isEditingInline ? (
                    <textarea
                      value={cp.deskripsi}
                      onChange={(e) => handleCpChange(cp.id, e.target.value)}
                      className="w-full border border-gray-300 rounded p-1 font-mono text-[10px]"
                      rows={6}
                    />
                  ) : (
                    <span className="whitespace-pre-line text-[11px] leading-relaxed block font-mono text-xs">{cp.deskripsi}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* B. LINTAS DISIPLIN ILMU */}
      <section className="mb-6 break-inside-avoid">
        <h3 className="font-sans text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded uppercase tracking-wider mb-3">
          B. LINTAS DISIPLIN ILMU
        </h3>
        <ul className="list-disc pl-5 text-xs text-gray-600 space-y-2 leading-relaxed">
          {data.lintasDisiplin.map((disiplin, idx) => (
            <li key={idx} className="text-justify">
              {isEditingInline ? (
                <input
                  type="text"
                  value={disiplin}
                  onChange={(e) => handleLintasDisiplinChange(idx, e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-0.5 mt-1"
                />
              ) : (
                <>
                  <strong className="text-slate-700 font-semibold">{disiplin.split(":")[0]}</strong>
                  {disiplin.split(":")[1] ? `: ${disiplin.split(":")[1]}` : ""}
                </>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* C. TUJUAN PEMBELAJARAN */}
      <section className="mb-6 break-inside-avoid">
        <h3 className="font-sans text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded uppercase tracking-wider mb-3">
          C. ALOKASI PERTEMUAN & TUJUAN PEMBELAJARAN
        </h3>
        <div className="space-y-3 text-xs">
          {data.tujuanPembelajaran.map((tp, idx) => (
            <div key={tp.id} className="p-3 border border-slate-100 rounded bg-slate-50/50">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-800">
                  {tp.pertemuan} ({tp.alokasi})
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 font-bold rounded">TP {idx + 1}</span>
              </div>
              {isEditingInline ? (
                <textarea
                  value={tp.deskripsi}
                  onChange={(e) => handleTpChange(tp.id, e.target.value)}
                  className="w-full border border-gray-300 rounded p-1.5 text-xs"
                  rows={2}
                />
              ) : (
                <p className="text-gray-600 text-justify leading-relaxed">{tp.deskripsi}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* D. INDIKATOR KETERCAPAIAN TUJUAN PEMBELAJARAN */}
      <section className="mb-6 break-inside-avoid">
        <h3 className="font-sans text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded uppercase tracking-wider mb-3">
          D. INDIKATOR KETERCAPAIAN TUJUAN PEMBELAJARAN (IKTP)
        </h3>
        <ol className="list-decimal pl-5 text-xs text-gray-600 space-y-2 leading-relaxed">
          {data.indikatorKetercapaian.map((indikator, idx) => (
            <li key={idx} className="text-justify">
              {isEditingInline ? (
                <input
                  type="text"
                  value={indikator}
                  onChange={(e) => handleIndikatorChange(idx, e.target.value)}
                  className="w-full border border-gray-300 rounded px-2"
                />
              ) : (
                indikator
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* E. IKLIM / BUDAYA MADRASAH */}
      <section className="mb-6 break-inside-avoid">
        <h3 className="font-sans text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded uppercase tracking-wider mb-3">
          E. IKLIM / BUDAYA BELAJAR MADRASAH
        </h3>
        <ul className="list-disc pl-5 text-xs text-gray-600 space-y-2 leading-relaxed text-justify">
          {data.iklimMadrasah.map((iklim, idx) => (
            <li key={idx}>{iklim}</li>
          ))}
        </ul>
      </section>

      {/* F. TOPIK PEMBELAJARAN KONTEKSTUAL */}
      <section className="mb-6 break-inside-avoid">
        <h3 className="font-sans text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded uppercase tracking-wider mb-3">
          F. TOPIK PEMBELAJARAN KONTEKSTUAL
        </h3>
        <p className="text-xs text-emerald-800 font-bold bg-emerald-50/75 border border-emerald-100 px-3 py-3 rounded text-center uppercase tracking-wider">
          {data.topikKontekstual}
        </p>
      </section>

      {/* G. KERANGKA PEMBELAJARAN */}
      <section className="mb-6 break-inside-avoid">
        <h3 className="font-sans text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded uppercase tracking-wider mb-3">
          G. KERANGKA PEMBELAJARAN & PEDAGOGIK
        </h3>
        <div className="space-y-4 text-xs">
          <div>
            <strong className="text-slate-800">● Model Pembelajaran:</strong>{" "}
            <span className="text-gray-600 font-medium">{data.modelPembelajaran}</span>
          </div>
          <div>
            <strong className="text-slate-800">● Pendekatan Deep Learning (KBC):</strong>
            <div className="grid grid-cols-1 gap-2.5 mt-2 pl-3 border-l-2 border-rose-300">
              <p className="text-gray-600 text-justify">
                <span className="font-bold text-slate-700 block mb-0.5">1. Mindful Learning (Belajar Penuh Kesadaran):</span>
                {data.pendekatanDeepLearning.mindful}
              </p>
              <p className="text-gray-600 text-justify">
                <span className="font-bold text-slate-700 block mb-0.5">2. Meaningful Learning (Belajar Bermakna):</span>
                {data.pendekatanDeepLearning.meaningful}
              </p>
              <p className="text-gray-600 text-justify">
                <span className="font-bold text-slate-700 block mb-0.5">3. Joyful Learning (Belajar Menyenangkan):</span>
                {data.pendekatanDeepLearning.joyful}
              </p>
            </div>
          </div>
          <div>
            <strong className="text-slate-800">● Metode Pembelajaran:</strong>
            <p className="text-gray-600 mt-1">{data.metodePembelajaran.join(", ")}</p>
          </div>
          <div>
            <strong className="text-slate-800">● Strategi Pembelajaran Berdiferensiasi:</strong>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
              <div className="p-2.5 border border-slate-100 rounded bg-slate-50/50">
                <span className="font-bold text-slate-700 block mb-1">Diferensiasi Konten</span>
                <p className="text-gray-600 text-justify leading-relaxed text-[11px]">{data.strategiBerdiferensiasi.konten}</p>
              </div>
              <div className="p-2.5 border border-slate-100 rounded bg-slate-50/50">
                <span className="font-bold text-slate-700 block mb-1">Diferensiasi Proses</span>
                <p className="text-gray-600 text-justify leading-relaxed text-[11px]">{data.strategiBerdiferensiasi.proses}</p>
              </div>
              <div className="p-2.5 border border-slate-100 rounded bg-slate-50/50">
                <span className="font-bold text-slate-700 block mb-1">Diferensiasi Produk</span>
                <p className="text-gray-600 text-justify leading-relaxed text-[11px]">{data.strategiBerdiferensiasi.produk}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <strong className="text-slate-800 block mb-1">● Kemitraan (Sekolah):</strong>
              <p className="text-gray-600 leading-relaxed text-justify">{data.kemitraan.sekolah}</p>
            </div>
            <div>
              <strong className="text-slate-800 block mb-1">● Kemitraan (Luar/Masyarakat):</strong>
              <p className="text-gray-600 leading-relaxed text-justify">{data.kemitraan.luarSekolah}</p>
            </div>
            <div>
              <strong className="text-slate-800 block mb-1">● Mitra Digital:</strong>
              <p className="text-gray-600 leading-relaxed text-justify">{data.kemitraan.digital}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <strong className="text-slate-800 block mb-1">● Ruang Fisik:</strong>
              <p className="text-gray-600 leading-relaxed text-justify">{data.lingkunganBelajar.ruangFisik}</p>
            </div>
            <div>
              <strong className="text-slate-800 block mb-1">● Ruang Virtual:</strong>
              <p className="text-gray-600 leading-relaxed text-justify">{data.lingkunganBelajar.ruangVirtual}</p>
            </div>
            <div>
              <strong className="text-slate-800 block mb-1">● Budaya Belajar Kelas:</strong>
              <p className="text-gray-600 leading-relaxed text-justify">{data.lingkunganBelajar.budayaBelajar}</p>
            </div>
          </div>
          <div>
            <strong className="text-slate-800">● Pemanfaatan Digital:</strong>
            <p className="text-gray-600 mt-1">{data.pemanfaatanDigital.join(" | ")}</p>
          </div>
        </div>
      </section>

      <div className="page-break print:block" style={{ pageBreakBefore: "always" }}></div>

      {/* H. LANGKAH-LANGKAH PEMBELAJARAN BERDIFERENSIASI (Meeting items) */}
      <section className="mb-6">
        <h3 className="font-sans text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded uppercase tracking-wider mb-4">
          H. TAHAPAN PROSES & LANGKAH-LANGKAH PEMBELAJARAN
        </h3>

        <div className="space-y-8">
          {data.langkahLangkah.map((langkah, index) => (
            <div key={langkah.id} className="border-b border-dashed border-slate-300 pb-6 last:border-b-0 break-inside-avoid">
              {/* Meeting Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-slate-750 pb-1.5 mb-3 bg-slate-50 p-2 rounded">
                <span className="font-sans font-bold text-slate-950 text-xs uppercase tracking-wider">
                  Pertemuan {langkah.pertemuanKe} ({langkah.durasi})
                </span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                  Topik KBC: {langkah.pancaCinta}
                </span>
              </div>
              <p className="text-[11px] font-semibold text-slate-800 mb-3.5 italic">
                Pembahasan: {langkah.topik}
              </p>

              {/* Steps (Pendahuluan, Inti, Penutup) */}
              <div className="space-y-4 text-xs">
                {/* 1. PENDAHULUAN */}
                <div>
                  <h4 className="font-semibold text-slate-800 uppercase tracking-tight text-[11px] mb-1.5 flex items-center justify-between">
                    <span>1. KEGIATAN PENDAHULUAN ({langkah.durasi.includes("90") ? "15 MENIT" : "10 MENIT"})</span>
                    {isEditingInline && (
                      <button
                        onClick={() => addLangkahItem(langkah.id, "pendahuluan")}
                        className="text-[10px] text-emerald-600 hover:underline cursor-pointer font-medium no-print"
                      >
                        + Tambah Langkah
                      </button>
                    )}
                  </h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1.5 text-justify leading-relaxed">
                    {langkah.pendahuluan.map((point, ptIdx) => (
                      <li key={ptIdx} className="group min-h-[22px]">
                        {isEditingInline ? (
                          <div className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={point}
                              onChange={(e) => handleLangkahSectionChange(langkah.id, "pendahuluan", ptIdx, e.target.value)}
                              className="flex-1 border border-gray-300 rounded px-2"
                            />
                            <button
                              onClick={() => removeLangkahItem(langkah.id, "pendahuluan", ptIdx)}
                              className="text-rose-500 hover:bg-rose-50 p-0.5 rounded no-print cursor-pointer"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ) : (
                          point
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. INTI */}
                <div>
                  <h4 className="font-semibold text-slate-800 uppercase tracking-tight text-[11px] mb-1.5 flex items-center justify-between">
                    <span>2. KEGIATAN INTI ({langkah.durasi.includes("90") ? "60 MENIT" : "50 MENIT"})</span>
                    {isEditingInline && (
                      <button
                        onClick={() => addLangkahItem(langkah.id, "inti")}
                        className="text-[10px] text-emerald-600 hover:underline cursor-pointer font-medium no-print"
                      >
                        + Tambah Langkah
                      </button>
                    )}
                  </h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1.5 text-justify leading-relaxed">
                    {langkah.inti.map((point, ptIdx) => (
                      <li key={ptIdx} className="group min-h-[22px]">
                        {isEditingInline ? (
                          <div className="flex gap-2 items-center">
                            <textarea
                              value={point}
                              onChange={(e) => handleLangkahSectionChange(langkah.id, "inti", ptIdx, e.target.value)}
                              className="flex-1 border border-gray-300 rounded px-2 text-xs"
                              rows={2}
                            />
                            <button
                              onClick={() => removeLangkahItem(langkah.id, "inti", ptIdx)}
                              className="text-rose-500 hover:bg-rose-50 p-0.5 rounded no-print cursor-pointer"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ) : (
                          point
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. PENUTUP */}
                <div>
                  <h4 className="font-semibold text-slate-800 uppercase tracking-tight text-[11px] mb-1.5 flex items-center justify-between">
                    <span>3. KEGIATAN PENUTUP ({langkah.durasi.includes("90") ? "15 MENIT" : "15 MENIT"})</span>
                    {isEditingInline && (
                      <button
                        onClick={() => addLangkahItem(langkah.id, "penutup")}
                        className="text-[10px] text-emerald-600 hover:underline cursor-pointer font-medium no-print"
                      >
                        + Tambah Langkah
                      </button>
                    )}
                  </h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1.5 text-justify leading-relaxed">
                    {langkah.penutup.map((point, ptIdx) => (
                      <li key={ptIdx} className="group min-h-[22px]">
                        {isEditingInline ? (
                          <div className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={point}
                              onChange={(e) => handleLangkahSectionChange(langkah.id, "penutup", ptIdx, e.target.value)}
                              className="flex-1 border border-gray-300 rounded px-2"
                            />
                            <button
                              onClick={() => removeLangkahItem(langkah.id, "penutup", ptIdx)}
                              className="text-rose-500 hover:bg-rose-50 p-0.5 rounded no-print cursor-pointer"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ) : (
                          point
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* I. ASESMEN PEMBELAJARAN */}
      <section className="mb-8 break-inside-avoid shadow-sm border border-gray-150 rounded-xl p-4 md:p-6 bg-slate-50/50 mt-4">
        <h3 className="font-sans text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded uppercase tracking-wider mb-4">
          I. ASESMEN PEMBELAJARAN
        </h3>
        <div className="space-y-4 text-xs">
          <div>
            <strong className="text-slate-800 block mb-1">● Asesmen Diagnostik (Awal Pembelajaran):</strong>
            <ul className="list-disc pl-5 text-gray-600 space-y-1 text-justify leading-relaxed">
              {data.asesmen.diagnostik.map((as, idx) => (
                <li key={idx}>{as}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong className="text-slate-800 block mb-1">● Asesmen Formatif (Proses Pembelajaran):</strong>
            <ul className="list-disc pl-5 text-gray-600 space-y-1 text-justify leading-relaxed">
              {data.asesmen.formatif.map((as, idx) => (
                <li key={idx}>{as}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong className="text-slate-800 block mb-1">● Asesmen Sumatif (Akhir Pembelajaran):</strong>
            <ul className="list-disc pl-5 text-gray-600 space-y-1 text-justify leading-relaxed">
              {data.asesmen.sumatif.map((as, idx) => (
                <li key={idx}>{as}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SIGNATURE AREA (TANDA TANGAN) */}
      <section className="mt-12 break-inside-avoid">
        <div className="flex flex-col sm:flex-row justify-between items-center text-center gap-8 text-xs font-sans">
          <div className="w-48">
            <p className="text-gray-500">Mengetahui,</p>
            <p className="font-semibold text-slate-800 mt-0.5">
              {isEditingInline ? (
                <input
                  type="text"
                  value={data.tandaTangan.jabatanKepala}
                  onChange={(e) => updateTandaTangan("jabatanKepala", e.target.value)}
                  className="w-full border border-gray-300 rounded text-center"
                />
              ) : (
                data.tandaTangan.jabatanKepala
              )}
            </p>
            <div className="h-16"></div>
            <p className="font-bold border-b border-gray-400 pb-0.5 text-slate-900 uppercase">
              {isEditingInline ? (
                <input
                  type="text"
                  value={data.tandaTangan.namaKepala}
                  onChange={(e) => updateTandaTangan("namaKepala", e.target.value)}
                  className="w-full border border-gray-300 rounded text-center font-bold"
                />
              ) : (
                data.tandaTangan.namaKepala
              )}
            </p>
            {data.tandaTangan.nipKepala && (
              <p className="text-[10px] text-gray-500 font-mono mt-0.5">
                NIP. {isEditingInline ? (
                  <input
                    type="text"
                    value={data.tandaTangan.nipKepala}
                    onChange={(e) => updateTandaTangan("nipKepala", e.target.value)}
                    className="w-full border border-gray-300 rounded text-center text-[10px]"
                  />
                ) : (
                  data.tandaTangan.nipKepala
                )}
              </p>
            )}
          </div>

          <div className="w-48">
            <p className="text-slate-600 font-medium">
              {isEditingInline ? (
                <input
                  type="text"
                  value={data.tandaTangan.tempatTanggal}
                  onChange={(e) => updateTandaTangan("tempatTanggal", e.target.value)}
                  className="w-full border border-gray-300 rounded text-center"
                />
              ) : (
                data.tandaTangan.tempatTanggal
              )}
            </p>
            <p className="text-gray-500 mt-0.5">Guru Mata Pelajaran,</p>
            <div className="h-16"></div>
            <p className="font-bold border-b border-gray-400 pb-0.5 text-slate-900 uppercase">
              {isEditingInline ? (
                <input
                  type="text"
                  value={data.tandaTangan.namaGuru}
                  onChange={(e) => updateTandaTangan("namaGuru", e.target.value)}
                  className="w-full border border-gray-300 rounded text-center font-bold"
                />
              ) : (
                data.tandaTangan.namaGuru
              )}
            </p>
            {data.tandaTangan.nipGuru && (
              <p className="text-[10px] text-gray-500 font-mono mt-0.5">
                NIP. {isEditingInline ? (
                  <input
                    type="text"
                    value={data.tandaTangan.nipGuru}
                    onChange={(e) => updateTandaTangan("nipGuru", e.target.value)}
                    className="w-full border border-gray-300 rounded text-center text-[10px]"
                  />
                ) : (
                  data.tandaTangan.nipGuru
                )}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
