import { ModulAjarData } from "./types";

export const OPTIONS_PANCA_CINTA = [
  "Cinta Allah dan Rasul (Mencintai Sang Pencipta dan utusan-Nya sebagai landasan segala aktivitas)",
  "Cinta Diri dan Sesama Manusia (Menjaga kesehatan tubuh, sportivitas, ta'awun, tasamuh, dan akhlak mulia)",
  "Cinta Lingkungan dan Alam (Adab kepada alam, kebersihan fasilitas, merawat ciptaan Allah)",
  "Cinta Ilmu dan Kebenaran (Semangat menuntut ilmu, bersungguh-sungguh, jujur, kritis, dan objektif)",
  "Cinta Bangsa dan Negara (Menghormati aturan, berkontribusi positif bagi tanah air, menjaga persatuan)"
];

export const OPTIONS_DIMENSI_PROFIL = [
  "Keimanan & Ketakwaan terhadap Tuhan YME, dan Berakhlak Mulia",
  "Kewargaan (Kewarganegaraan & Kebinekaan Global)",
  "Penalaran Kritis",
  "Kreativitas",
  "Kolaborasi / Gotong Royong",
  "Kemandirian",
  "Kesehatan Fisik & Mental",
  "Komunikasi & Keterbukaan"
];

export const OPTIONS_FASE = ["A", "B", "C", "D", "E", "F"];
export const OPTIONS_SEMESTER = ["Ganjil", "Genap"];
export const OPTIONS_KELAS = ["X", "XI", "XII"];

export const DEFAULT_MODUL_AJAR: ModulAjarData = {
  id: "rpp-bahasa-arab-olahraga",
  judul: "Modul Ajar Bahasa Arab: Bab 1 - Olahraga",
  identitas: {
    namaMadrasah: "MAS BANU HASYIM",
    namaPenyusun: "USMAN, S.Pd.I., M.Pd.I.",
    mataPelajaran: "Bahasa Arab",
    kelas: "XII",
    fase: "F",
    semester: "Ganjil",
    alokasiWaktu: "16 JP (8 kali pertemuan)",
    jumlahPertemuan: 8,
    tahunPelajaran: "2025/2026"
  },
  kesiapanPeserta: {
    pengetahuanAwal: "Peserta didik memiliki pengetahuan dasar tentang beberapa jenis olahraga populer dan pernah mempelajari kosakata dasar (mufradat) terkait aktivitas sehari-hari dalam Bahasa Arab di fase sebelumnya.",
    minat: "Sebagian besar peserta didik memiliki minat pada kegiatan olahraga, baik sebagai pemain maupun penonton. Minat ini menjadi modal untuk menumbuhkan cinta pada aktivitas fisik sebagai wujud syukur.",
    latarBelakang: "Peserta didik berasal dari latar belakang yang beragam, dengan tingkat paparan yang berbeda terhadap kegiatan olahraga dan pembelajaran Bahasa Arab.",
    kebutuhanBelajar: {
      visual: "Membutuhkan gambar, video, dan poster tentang berbagai cabang olahraga dengan keterangan dalam Bahasa Arab untuk memahami kosakata dan konteks.",
      auditori: "Membutuhkan contoh pelafalan kosakata dan ungkapan yang benar melalui audio atau langsung dari guru, serta dialog interaktif.",
      kinestetik: "Membutuhkan aktivitas bergerak seperti permainan peran (role-playing), simulasi pertandingan, atau kegiatan mencocokkan kartu yang melibatkan gerakan fisik."
    }
  },
  temaKbc: {
    topikPancaCinta: "Cinta Diri dan Sesama Manusia (Menjaga kesehatan tubuh, sportivitas, ta'awun, tasamuh, dan akhlak mulia)",
    materiInsersi: [
      "Membiasakan diri menjaga kebersihan, kesehatan, dan keselamatan diri sebagai bentuk syukur dan tanggung jawab kepada Allah.",
      "Memahami akhlak terpuji kepada sesama: ta'awun (tolong-menolong), tafahum (saling memahami), dan tasamuh (toleransi) dalam konteks sportivitas di lapangan.",
      "Adab pada alam dan lingkungan, dengan memahami pentingnya menjaga kebersihan fasilitas olahraga sebagai wujud cinta pada lingkungan sekolah."
    ]
  },
  karakteristikMateri: {
    konseptual: "Memahami konsep olahraga sebagai aktivitas untuk menjaga kesehatan fisik dan mental, serta sebagai sarana menumbuhkan nilai-nilai positif seperti kerjasama dan sportivitas, yang merupakan cerminan cinta pada diri dan sesama.",
    prosedural: "Mampu menggunakan struktur gramatikal (النعت والإضافة) untuk mendeskripsikan dan membandingkan berbagai jenis olahraga secara lisan dan tulisan.",
    relevansi: "Materi ini sangat relevan karena olahraga adalah bagian dari gaya hidup sehat. Peserta didik dapat menerapkan pengetahuan ini untuk mendeskripsikan hobi mereka, membicarakan pertandingan, dan memahami pentingnya menjaga tubuh sebagai anugerah Tuhan yang dilandasi rasa cinta.",
    tingkatKesulitan: "Sedang",
    strukturMateri: "Materi disajikan secara sistematis, dimulai dari pengenalan kosakata (mufradat) terkait olahraga individu dan kelompok, dilanjutkan dengan pemahaman teks bacaan (qira'ah), pendalaman kaidah tata bahasa (qawa'id), dan diakhiri dengan latihan keterampilan berbicara (kalam) dan menulis (kitabah).",
    integrasiNilai: "Mengintegrasikan nilai cinta pada kesehatan diri, sportivitas, kerjasama tim (ta'awun), saling menghargai, dan menjaga kebersihan lingkungan sebagai manifestasi dari rasa syukur dan cinta kepada ciptaan Allah Swt."
  },
  dimensiProfil: [
    "Keimanan & Ketakwaan terhadap Tuhan YME, dan Berakhlak Mulia",
    "Kewargaan (Kewarganegaraan & Kebinekaan Global)",
    "Penalaran Kritis",
    "Kreativitas",
    "Kolaborasi / Gotong Royong",
    "Kemandirian",
    "Kesehatan Fisik & Mental",
    "Komunikasi & Keterbukaan"
  ],
  capaianPembelajaran: [
    {
      id: "cp-1",
      elemen: "Menyimak - Berbicara",
      deskripsi: "Memahami informasi yang diterima secara tersirat dan tersurat dan mengkonstruksi bahasa secara lisan tentang wisata, kesehatan, haji dan umroh, agama-agama di Indonesia, teknologi informasi dan komunikasi, tokoh-tokoh Islam, kuliah di universitas dengan menggunakan struktur gramatikal:\nالتصريف اللغوي للفعل الماضي، التصريف اللغوي للفعل المضارع، التصريف اللغوي لفعل الأمر، النعت، الإضافة، اسم التفضيل، الفعل المبني للمعلوم والفعل المبني للمجهول، الفعل المضارع المرفوع والمنصوب والمجزوم"
    },
    {
      id: "cp-2",
      elemen: "Membaca - Memirsa",
      deskripsi: "Memahami secara tersurat dan tersirat berbagai teks visual atau teks multimodal dalam cerita pendek/artikel/esai/laporan/buku tentang wisata, kesehatan, haji dan umroh, agama-agama di Indonesia, teknologi informasi dan komunikasi, tokoh-tokoh Islam, kuliah di universitas dengan menggunakan struktur gramatikal:\nالتصريف اللغوي للفعل الماضي، التصريف اللغوي للفعل المضارع، التصريف اللغوي لفعل الأمر، النعت، الإضافة، اسم التفضيل، الفعل المبني للمعلوم والفعل المبني للمجهول، الفعل المضارع المرفوع والمنصوب والمجزوم"
    },
    {
      id: "cp-3",
      elemen: "Menulis - Mempresentasikan",
      deskripsi: "Memahami gagasan teks secara tertulis dan lisan dengan bebas sesuai tema wisata, kesehatan, haji dan umroh, agama-agama di Indonesia, teknologi informasi dan komunikasi, tokoh-tokoh Islam, kuliah di universitas dengan menggunakan struktur gramatikal:\nالتصريف اللغوي للفعل الماضي، التصريف اللغوي للفعل المضارع، التصريف اللغوي لفعل الأمر، النعت، الإضافة، اسم التفضيل، الفعل المبني للمعلوم والفعل المبني للمجهول، الفعل المضارع المرفوع والمنصوب والمجزوم"
    }
  ],
  lintasDisiplin: [
    "Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK): Menghubungkan istilah-istilah olahraga dalam Bahasa Arab dengan praktik dan pengetahuan nyata di lapangan.",
    "Biologi: Memahami manfaat olahraga bagi kesehatan jantung, peredaran darah, dan otot manusia sebagai bentuk rasa cinta pada ciptaan Allah Swt.",
    "Sosiologi: Memahami olahraga sebagai fenomena sosial masa kini yang dapat membangun kerjasama, sportivitas, dan perdamaian antar sesama manusia."
  ],
  tujuanPembelajaran: [
    {
      id: "tp-1",
      pertemuan: "Pertemuan 1-2",
      alokasi: "2 JP + 2 JP",
      deskripsi: "Melalui kegiatan menyimak dan diskusi yang penuh cinta, peserta didik mampu mengidentifikasi dan melafalkan kosakata (mufradat) terkait olahraga individu (الرياضة الفردية) dan olahraga kelompok (الرياضة الجماعية) dengan benar."
    },
    {
      id: "tp-2",
      pertemuan: "Pertemuan 3-4",
      alokasi: "2 JP + 2 JP",
      deskripsi: "Dengan semangat cinta ilmu, peserta didik mampu menganalisis fungsi sosial dan struktur teks deskriptif sederhana terkait topik olahraga serta memahami fakta eksplisit/implisit dari teks yang dibaca."
    },
    {
      id: "tp-3",
      pertemuan: "Pertemuan 5-6",
      alokasi: "2 JP + 2 JP",
      deskripsi: "Dengan rasa ingin tahu dan cinta pada kaidah bahasa, peserta didik mampu memahami dan menerapkan susunan gramatikal Na'at Man'ut (النعت والمنعوت) dan Idhafah (الإضافة) untuk mendeskripsikan objek terkait olahraga."
    },
    {
      id: "tp-4",
      pertemuan: "Pertemuan 7-8",
      alokasi: "2 JP + 2 JP",
      deskripsi: "Dengan penuh percaya diri sebagai wujud cinta pada potensi diri, peserta didik mampu mendemonstrasikan tindak tutur membandingkan sesuatu dan mengkonstruksi teks deskriptif sederhana tentang olahraga secara lisan dan tulisan."
    }
  ],
  indikatorKetercapaian: [
    "Peserta didik dapat mengklasifikasikan minimal 15 kosakata olahraga ke dalam kategori individu dan kelompok.",
    "Peserta didik dapat melafalkan kosakata dan ungkapan tentang olahraga dengan intonasi yang tepat.",
    "Peserta didik dapat menjawab pertanyaan terkait isi teks bacaan tentang olahraga.",
    "Peserta didik dapat mengidentifikasi susunan Na'at Man'ut dan Idhafah dalam kalimat.",
    "Peserta didik dapat melengkapi kalimat rumpang menggunakan Na'at Man'ut dan Idhafah yang sesuai.",
    "Peserta didik dapat menyusun kata acak menjadi kalimat yang bermakna tentang olahraga.",
    "Peserta didik dapat membuat 3 kalimat perbandingan sederhana tentang olahraga dengan isim tafdhil.",
    "Peserta didik dapat mempraktikkan dialog singkat tentang olahraga favorit bersama rekan kelas.",
    "Peserta didik dapat menulis sebuah paragraf deskriptif singkat (3-5 kalimat) tentang satu jenis olahraga."
  ],
  iklimMadrasah: [
    "Menciptakan suasana belajar yang positif, saling mendukung, dan penuh kasih sayang, di mana setiap peserta didik merasa dihargai tanpa memandang perbedaan.",
    "Membiasakan budaya apresiasi terhadap setiap usaha dan pencapaian teman, sebagai wujud syukur dan cinta kepada sesama makhluk.",
    "Mengedepankan dialog dan diskusi yang santun serta penuh kasih sayang dalam menyelesaikan masalah atau perbedaan pendapat selama pembelajaran."
  ],
  topikKontekstual: "Olahraga sebagai Wujud Cinta pada Diri dan Sesama",
  modelPembelajaran: "Genre-Based Approach",
  pendekatanDeepLearning: {
    mindful: "Peserta didik diajak untuk fokus dan sadar penuh (mindful) saat belajar, misalnya dengan latihan pernapasan singkat (box breathing) sebelum memulai pelajaran untuk menumbuhkan ketenangan, mengaitkan aktivitas belajar sebagai niat lillahita'ala (ibadah).",
    meaningful: "Materi pembelajaran dikaitkan langsung dengan pengalaman hidup murid dan hobi olahraga favorit mereka, serta dihubungkan dengan nilai-nilai kesehatan sebagai amanah fisik, sportivitas, dan kerjasama tim yang solid (ta'awun).",
    joyful: "Pembelajaran dikemas dalam suasana yang riang gembira melalui game klasifikasi mufradat, kuis interaktif, kompetisi persahabatan, dan roleplaying simulasi presenter berita olahraga berbahasa Arab."
  },
  metodePembelajaran: [
    "Diskusi Kelompok",
    "Tanya Jawab Interaktif",
    "Demonstrasi Pelafalan",
    "Penugasan Mandiri",
    "Permainan Klasifikasi (Card Matching)",
    "Role Playing (Simulasi Pertandingan)"
  ],
  strategiBerdiferensiasi: {
    konten: "Menyediakan materi kosakata dalam format audio pelafalan, visual poster infografis olahraga, teks bacaan dengan harakat lengkap/tanpa harakat, serta tayangan video siaran pertandingan sepak bola dengan komentator Arab.",
    proses: "Memberikan kebebasan belajar secara individu, berpasangan (dialog), atau kelompok (klasifikasi/game). Memisahkan tingkat bantuan belajar (scaffolding) bagi yang butuh asisten guru dibanding yang sudah mahir.",
    produk: "Memberikan kebebasan bagi peserta didik untuk mendemonstrasikan kelancaran bahasanya lewat rekaman suara dialog, poster cabang olahraga terjemahan, atau essay deskriptif pendek."
  },
  kemitraan: {
    sekolah: "Berkolaborasi dengan Guru PJOK (Pendidikan Jasmani) untuk menyelaraskan waktu pembelajaran dan relevansi praktik olahraga, memanfaatkan sarana gedung olahraga / lapangan madrasah.",
    luarSekolah: "Mengundang alumni berprestasi di kancah pekan olahraga daerah atau atlet lokal untuk berbagi cerita perjuangan dan integritas, memotivasi kecintaan murid pada prestasi.",
    digital: "Menggunakan YouTube (siaran langsung beIN Sports Arabic commentator), WhatsApp Group, Google Drive untuk arsip portofolio suara siswa, dan platform kuis digital."
  },
  lingkunganBelajar: {
    ruangFisik: "Menata meja kursi kelas berspora (fleksibel) agar mudah bertransisi dari bentuk U ke kelompok bento. Memajang poster kosa-kata olahraga Arab di dinding ruang kelas.",
    ruangVirtual: "Google Classroom sebagai repositori utama, serta WhatsApp Group untuk respon cepat dan penyerahan tugas digital berupa video praktikum kalam.",
    budayaBelajar: "Membangun atmosfer kelas aman, di mana kesalahan pelafalan (lahjah) tidak ditertawakan melainkan dirayakan sebagai langkah belajar bertumbuh."
  },
  pemanfaatanDigital: [
    "Penggunaan proyektor / smart board untuk menampilkan infografis olahraga dan teks qira'ah interaktif.",
    "Kamus Digital (Almaany / Kamusku Arab) sebagai alat bantu pencarian mufradat baru mandiri.",
    "Platform interaktif Quizizz / Kahoot! untuk latihan dan asesmen formatif yang bersahabat."
  ],
  langkahLangkah: [
    {
      id: "pertemuan-1",
      pertemuanKe: 1,
      topik: "Pengenalan Kosakata Olahraga (المفردات عن الرياضة)",
      pancaCinta: "Cinta Diri dan Sesama Manusia",
      durasi: "2 JP : 90 MENIT",
      pendahuluan: [
        "Salam dan Doa: Guru membuka pelajaran dengan hangat, menanyakan kabar murid, lalu berdoa bersama sebagai wujud syukur dan cinta kepada Allah Swt.",
        "Mindful Moment: Guru memandu latihan pernapasan ringan (tarik napas 4 detik, tahan 4 detik, hembuskan 4 detik) untuk menghilangkan stress anak dan memperkuat konsentrasi diri sebelum belajar.",
        "Apersepsi: Guru menyajikan siluet / foto atlet nasional berprestasi (seperti Al-Nassr / timnas) lalu bertanya: 'Siapakah atlet ini? Cabang olahraga apa yang dia tekuni?'",
        "Motivasi: Guru menekankan bahwa menjaga kesehatan fisik via olahraga adalah wujud nyata menghormati dan mencintai diri sendiri sebagai titipan tuhan.",
        "Penyampaian Tujuan: Guru menerangkan bahwa akhir hari ini murid dapat menyuarakan, membaca, dan mengelompokkan 15 kosakata olahraga Arab dengan pas."
      ],
      inti: [
        "Building Knowledge of the Field (BKoF): Guru mendisplay beberapa poster visual olahraga dengan tulisan Arab di papan tulis atau slide proyektor.",
        "Modelling of the Text (MoT): Guru membacakan kosakata olahraga seperti: الجَرْيُ (lari), السِّبَاحَةُ (renang), كُرَةُ القَدَمِ (sepak bola), الكُرَةُ الطَّائِرَةُ (voli) secara lantang dengan makhraj fasih.",
        "Drilling: Guru memandu murid melafalkan kosakata tersebut berulang-ulang: mula-mula bareng satu kelas, lalu per deret kursi, hingga ditunjuk acak perseorangan dengan penuh apresiasi.",
        "Permainan Klasifikasi: Di papan tulis dipisah dua kolom: الرياضة الفردية (Olahraga Individu) dan الرياضة الجماعية (Olahraga Kelompok). Perwakilan murid maju ke depan memindahkan kartu olahraga ke kolom klasifikasi yang tepat.",
        "Diferensiasi Proses & Kolaborasi: Kelas dibagi ke kelompok kecil (3-4 orang). Masing-masing dibekali kartu mini gambar cabang olahraga. Mereka berlatih mencocokkan kata Arab dengan gambar. Siswa dengan kecenderungan kinestetik memperagakan gerakan olahraga tanpa suara, sementara teman sekelompok menebaknya dalam Bahasa Arab dengan riang (Joyful Learning)."
      ],
      penutup: [
        "Refleksi: Guru melontarkan pertanyaan: 'Olahraga apa yang paling kalian cintai? Kosa kata mana yang lafalnya paling unik?'",
        "Rangkuman: Menyimpulkan bersama arti dari beberapa olahraga penting dan struktur sederhana.",
        "Tindak Lanjut: Menugaskan murid untuk mencari minimal 1 nama olahraga tambahan dalam Bahasa Arab di internet / kamus untuk dibagikan minggu depan.",
        "Doa dan Penutup: Mengakhiri jam pelajaran dengan hamdalah dan salam penuh kasih sayang."
      ]
    },
    {
      id: "pertemuan-2",
      pertemuanKe: 2,
      topik: "Keterampilan Kalam - Percakapan Olahraga Favorit (الحوار عن الرياضة)",
      pancaCinta: "Cinta Diri dan Sesama Manusia",
      durasi: "2 JP : 90 MENIT",
      pendahuluan: [
        "Salam, Doa & Absensi hangat dengan menanyakan kondisi kesehatan murid.",
        "Mindful Moment: Memejamkan mata sejenak, membayangkan udara pagi yang sejuk di lapangan olahraga untuk mendatangkan kesegaran psikis.",
        "Apersepsi: Menagih tugas tindak lanjut pertemuan lalu mengenai kosa kata olahraga baru secara berpasangan.",
        "Penyampaian Target: Hari ini kita akan mempraktikkan dialog sederhana menanyakan olahraga favorit teman."
      ],
      inti: [
        "Building Knowledge: Menjelaskan pola tanya-jawab olahraga favorit: مَا هِيَ رِيَاضَتُكَ المُفَضَّلَةُ؟ (Apa olahraga favorit kamu?) dan رِيَاضَتِي المُفَضَّلَةُ هِيَ... (Olahraga favorit saya adalah...).",
        "Modelling: Menampilkan naskah percakapan pendek antara dua remaja tentang sepak bola dan renang di layar LCD. Guru melafalkan contoh intonasi ekspresif.",
        "Pair-Practice: Murid bekerja berpasangan mempraktikkan naskah dialog. Guru berkeliling memberi pujian hangat atas pelafalan yang tepat.",
        "Diferensiasi Proses: Murid yang butuh bantuan ekstra menggunakan naskah panduan tertulis utuh di depan layar, sedangkan murid yang sudah mahir dipersilakan melakukan improvisasi dialog bebas menceritakan hobi aslinya.",
        "Showcase: Beberapa pasang murid maju mendemonstrasikan percakapan mereka di depan kelas. Guru dan siswa lain memberikan tepuk tangan tanda cinta sesama kawan."
      ],
      penutup: [
        "Refleksi: Menanyakan bagaimana perasaan murid setelah berani berbicara Bahasa Arab di depan umum.",
        "Rangkuman: Guru menekankan esensi saling menghargai hobi olahraga kawan (tasamuh) sebagai bagian dari cinta sesama.",
        "Doa & Salam penutup pembelajaran."
      ]
    },
    {
      id: "pertemuan-3",
      pertemuanKe: 3,
      topik: "Memahami Teks Deskriptif Olahraga (القراءة والقرابة)",
      pancaCinta: "Cinta Ilmu dan Kebenaran",
      durasi: "2 JP : 90 MENIT",
      pendahuluan: [
        "Salam Pembuka dan Berdoa untuk kelancaran menyerap ilmu baru.",
        "Mindful Moment: Mengatur duduk tegak, melatih tarikan napas panjang untuk menyuplai oksigen ke otak demi kelancaran membaca teks.",
        "Apersepsi: Mengaitkan mufradat olahraga yang sudah dikuasai dengan kerangka kalimat yang lebih panjang dalam bentuk paragraf."
      ],
      inti: [
        "BKoF: Guru membagikan teks bacaan pendek berjudul 'الرِّيَاضَةُ الصِّحِّيَّةُ' (Olahraga yang Menyehatkan) yang menerangkan manfaat lari pagi dan berenang.",
        "Modelling: Membaca senyap (silent reading) paragraf demi paragraf, dilanjutkan modeling oleh guru yang menggarisbawahi intonasi berhenti dan lanjut.",
        "Vocabulary Mapping: Murid secara berkelompok mengidentifikasi kalimat kunci dan menandai kosa kata sulit dari teks untuk dicarikan arti bersamanya menggunakan kamus digital.",
        "Diferensiasi Konten: Menyediakan dua versi teks bacaan: Versi A (paragraf pendek dengan harakat penuh) dan Versi B (teks artikel sains populer sederhana tanpa harakat untuk siswa tingkat lanjut)."
      ],
      penutup: [
        "Refleksi: 'Informasi berharga apa yang didapat dari tulisan tadi mengenai sel-sel tubuh?'",
        "Rangkuman: Membuat kesimpulan manfaat masing-masing olahraga bagi sirkulasi oksigen tubuh.",
        "Tutup doa dan salam."
      ]
    },
    {
      id: "pertemuan-4",
      pertemuanKe: 4,
      topik: "Bedah Pemahaman & Analisis Teks Multi-modal",
      pancaCinta: "Cinta Lingkungan dan Alam",
      durasi: "2 JP : 90 MENIT",
      pendahuluan: [
        "Salam, doa bersama, dan pembacaan quote pagi tentang kebersihan fasilitas publik.",
        "Apersepsi: Mengingat kembali isi teks bacaan Olahraga Menyehatkan."
      ],
      inti: [
        "Discussion: Mendiskusikan adab berolahraga di luar ruangan dan kewajiban menjaga fasilitas kebersihan lapangan sebagai bagian cinta lingkungan.",
        "Comprehension Check: Menyelesaikan pertanyaan-pertanyaan pemahaman terkait teks olahraga secara mandiri di buku masing-masing.",
        "Pair-Share: Murid saling menukar jawaban dengan teman sebangku dan mendiskusikannya dengan santun (tafahum) jika ada perbedaan versi jawaban.",
        "Diferensiasi Produk: Murid dipersilakan mengumpulkan hasil pemahaman teks dalam bentuk lisan (rekaman suara) atau tulisan jawaban di buku tulis."
      ],
      penutup: [
        "Apresiasi usaha pengerjaan tugas oleh guru dengan memberikan pin bintang kertas.",
        "Doa penutup majelis."
      ]
    },
    {
      id: "pertemuan-5",
      pertemuanKe: 5,
      topik: "Pemahaman Gramatikal: Na'at & Man'ut (النعت والمنعوت)",
      pancaCinta: "Cinta Ilmu dan Kebenaran",
      durasi: "2 JP : 90 MENIT",
      pendahuluan: [
        "Salam, doa, dan ice-breaking singkat tepuk semangat untuk menyegarkan pikiran.",
        "Apersepsi: Menampilkan dua kata: رِيَاضَةٌ (olahraga) dan جَمِيْلَةٌ (indah). Guru bertanya: 'Bagaimana hubungan kedua kata ini?'"
      ],
      inti: [
        "Grammar Presentation: Guru menerangkan struktur Na'at (sifat) dan Man'ut (yang disifati). Menyoroti kesesuaian dalam aspek gender (mudzakkar/muannats), jumlah (mufrad), dan makrifah/nakirah (adanya Al-). Contoh: الرِّيَاضَةُ المُفِيْدَةُ (olahraga yang bermanfaat).",
        "Syntax Hunting: Murid kembali membuka teks bacaan pertemuan 3 dan berburu contoh susunan Na'at-Man'ut di dalam teks tersebut.",
        "Sentence Creation: Murid mencoba merangkai kalimat mereka sendiri menggambarkan olahraga spesifik dengan kata sifat yang tepat.",
        "Diferensiasi Proses: Siswa yang lambat menyerap dibantu dengan rumus visual template kotak berwarna, sedangkan yang cepat diberikan soal menantang mengubah struktur berharkat."
      ],
      penutup: [
        "Refleksi: 'Bagaimana kaidah Na'at mempermudah kita melukiskan sesuatu secara detail?'",
        "Rangkuman kaidah kesesuaian Na'at & Man'ut.",
        "Salam penutup."
      ]
    },
    {
      id: "pertemuan-6",
      pertemuanKe: 6,
      topik: "Pemahaman Gramatikal: Idhafah (الإضافة)",
      pancaCinta: "Cinta Ilmu dan Kebenaran",
      durasi: "2 JP : 90 MENIT",
      pendahuluan: [
        "Salam hangat, doa bersama, dan motivasi mencintai kerapihan berbahasa.",
        "Apersepsi: Membedakan kalimat sifat (Na'at) dengan kalimat kepemilikan / gabungan kata benda (Idhafah)."
      ],
      inti: [
        "Grammar Presentation: Guru mengupas struktur Idhafah (Mudhaf & Mudhaf Ilaih). Memberikan sampel kontras: كُرَةُ القَدَمِ (bola kaki / sepak bola) dan مَلْعَبُ المَدْرَسَةِ (lapangan sekolah). Menjelaskan aturan Mudhaf tidak boleh ber-Al dan bersuara tanwin.",
        "Grouping & Match: Game mencocokkan kartu kata Mudhaf dengan Mudhaf Ilaih yang logis membentuk frase olahraga.",
        "Latihan Rumpang: Mengisi kalimat rumpang di modul kerja dengan kata yang sesuai struktur Idhafah.",
        "Diferensiasi Produk: Murid mengumpulkan catatan peta pikiran (mind mapping) perbandingan struktur Na'at vs Idhafah sesuai kreasi visual mereka masing-masing."
      ],
      penutup: [
        "Review cepat materi tata bahasa. Pemberian apresiasi ke kelompok terkompak.",
        "Doa dan salam jabat tangan santun."
      ]
    },
    {
      id: "pertemuan-7",
      pertemuanKe: 7,
      topik: "Struktur Perbandingan (اسم التفضيل) & Tindak Tutur",
      pancaCinta: "Cinta Diri dan Sesama Manusia",
      durasi: "2 JP : 90 MENIT",
      pendahuluan: [
        "Salam, doa awal pembelajaran dan pusingan yel-yel kelas.",
        "Apersepsi: Guru membandingkan tinggi dua murid dengan ramah dan bertanya kata pembandingnya."
      ],
      inti: [
        "Presentation: Menjelaskan pola Isim Tafdhil (أَفْعَلُ) untuk menyatakan 'lebih ... daripada'. Contoh: الجَرْيُ أَسْرَعُ مِنَ المَشْيِ (Lari lebih cepat daripada jalan kaki).",
        "Collaborative Dialogue: Murid dalam pasangannya diperintah membuat dialog perbandingan opini, misalnya membandingkan serunya sepak bola versus basket dengan santun.",
        "Diferensiasi Proses: Kelompok visual didukung kartu grafis bergoyang perbandingan kecepatan, kelompok kinestetik memerankan gesture kedinginan renang vs panas lari."
      ],
      penutup: [
        "Refleksi: Menghargai perbedaan pendapat selera olahraga teman tanpa menjelekkan hobi teman lain.",
        "Rangkuman struktur Isim Tafdhil.",
        "Salam penutup."
      ]
    },
    {
      id: "pertemuan-8",
      pertemuanKe: 8,
      topik: "Evaluasi, Menulis Deskripsi & Asesmen Sumatif",
      pancaCinta: "Cinta Diri dan Sesama Manusia",
      durasi: "2 JP : 90 MENIT",
      pendahuluan: [
        "Salam, doa khusyu' memohon pemahaman hati.",
        "Motivasi: Yakinkan murid bahwa kemampuan terbaik mereka hari ini adalah manifestasi cinta pada potensi akal sehat karunia Allah."
      ],
      inti: [
        "Asesmen Sumatif Tulis: Guru membagikan lembar tes tulis singkat berdurasi 45 menit yang ramah untuk mengukur pencapaian kognitif mufradat, Na'at, Idhafah, dan Isim Tafdhil.",
        "Praktik Menulis (Kitabah): Sisa waktu dihabiskan untuk memoles paragraf deskripsi olahraga favorit (3-5 kalimat) yang sudah dilatih sepanjang bab.",
        "Diferensiasi Produk: Siswa mengumpulkan produk akhir pilihan: draft tulisan dekoratif (poster mini), file kompilasi teks digital Google Doc, atau presentasi lisan singkat direkam di gawai masing-masing."
      ],
      penutup: [
        "Refleksi Akhir Bab: Guru membagikan sticker emoticon cinta dan meminta siswa menempelkan refleksi kepuasan belajar bab 1 ini.",
        "Pemberian sertifikat apresiasi 'Atholibul Mumtaz (Murid Teladan)' secara humoris dan penuh kehangatan kepada murid yang menunjukkan usaha paling bersungguh-sungguh.",
        "Doa penutup satu madrasah bersama Kepala Madrasah diwakili guru, dilanjutkan jabat tangan penutup bab."
      ]
    }
  ],
  asesmen: {
    diagnostik: [
      "Kognitif: Pre-test lisan kilat mengenai 5 istilah olahraga Arab dilingkungan sekitar rumah.",
      "Non-Kognitif: Penjajakan angket minat bakat olahraga utama murid serta kecenderungan modal belajar (Audio / Visual / Kinestetik) sebelum pemetaan modul."
    ],
    formatif: [
      "Observasi: Format checklist guru saat memantau drilling pelafalan vokal dan kelancaran membaca teks qira'ah.",
      "Tanya Jawab: Pertanyaan cek pemahaman spontan di sela-sela paparan tata bahasa.",
      "Penugasan: Latihan tertulis melengkapi Na'at Man'ut dan Idhafah di lembar kerja siswa.",
      "Unjuk Kerja: Penilaian kelancaran berbicara melalui rekaman dialog / performa panggung pasangannya."
    ],
    sumatif: [
      "Tes Tulis: Evaluasi tertulis (Pilihan ganda, Isian struktur tata bahasa, dan menerjemahkan kalimat olahraga).",
      "Proyek Kreatif (Alternatif Produk): Desain brosur / poster 'Ayo Berolahraga' lengkap dengan penjelasan kosakata Bahasa Arab dan ajakan moral cinta kesehatan diri."
    ]
  },
  tandaTangan: {
    namaKepala: "Drs. Wahyu Hadi Pramono",
    nipKepala: "196711201993031002",
    namaGuru: "Usman, S.Pd.I., M.Pd.I.",
    nipGuru: "198104122009121004",
    tempatTanggal: "Mojosari, 15 Juli 2025",
    jabatanKepala: "Kepala MAS Banu Hasyim"
  }
};
