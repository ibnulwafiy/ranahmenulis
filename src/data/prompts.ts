import { AiPromptCategory, AiPromptItem } from '@/types';

export const promptCategories: AiPromptCategory[] = [
  // IDE & KONSEP
  {
    id: 'cari-ide',
    title: 'Cari Ide',
    description: 'Temukan premis, sudut pandang unik, dan benih konflik emosional untuk naskah antologi.',
    iconName: 'Sparkles',
    promptCount: 5,
  },
  {
    id: 'kembangkan-ide',
    title: 'Kembangkan Ide',
    description: 'Ubah ide dasar atau satu kalimat menjadi premis yang lebih matang dan siap ditulis.',
    iconName: 'Lightbulb',
    promptCount: 5,
  },
  {
    id: 'tentukan-tema',
    title: 'Tentukan Tema',
    description: 'Pilih tema sentral yang kuat untuk mengikat seluruh elemen cerita Anda.',
    iconName: 'Target',
    promptCount: 5,
  },
  {
    id: 'buat-judul',
    title: 'Buat Judul',
    description: 'Hasilkan judul puitis, menggugah emosi, dan berdaya pikat tinggi bagi pembaca.',
    iconName: 'Type',
    promptCount: 5,
  },

  // STRUKTUR
  {
    id: 'buat-outline',
    title: 'Buat Outline',
    description: 'Rancang struktur alur 3 babak, pacing adegan, dan kronologi cerita yang rapi.',
    iconName: 'LayoutTemplate',
    promptCount: 5,
  },
  {
    id: 'bangun-alur',
    title: 'Bangun Alur',
    description: 'Rancang plot point, inciting incident, klimaks, dan resolusi cerita.',
    iconName: 'GitMerge',
    promptCount: 5,
  },
  {
    id: 'bangun-karakter',
    title: 'Bangun Karakter',
    description: 'Ciptakan karakter dengan kedalaman psikologis, motivasi, dan ketakutan.',
    iconName: 'UserPlus',
    promptCount: 5,
  },
  {
    id: 'buat-scene',
    title: 'Buat Scene',
    description: 'Rencanakan adegan demi adegan agar cerita mengalir tanpa terasa membosankan.',
    iconName: 'Clapperboard',
    promptCount: 5,
  },

  // PENULISAN
  {
    id: 'kembangkan-paragraf',
    title: 'Kembangkan Paragraf',
    description: 'Lanjutkan paragraf yang mandek agar lebih deskriptif dan kaya.',
    iconName: 'AlignLeft',
    promptCount: 5,
  },
  {
    id: 'kalimat-pembuka',
    title: 'Kalimat Pembuka',
    description: 'Ciptakan hook kalimat pertama yang langsung menarik pembaca ke dalam cerita.',
    iconName: 'ChevronRightSquare',
    promptCount: 5,
  },
  {
    id: 'kalimat-penutup',
    title: 'Kalimat Penutup',
    description: 'Rangkai kalimat akhir yang melegakan, mendalam, dan meninggalkan resonansi batin.',
    iconName: 'CheckCircle',
    promptCount: 5,
  },
  {
    id: 'buat-dialog',
    title: 'Buat Dialog',
    description: 'Tulis percakapan antar karakter yang natural, berkonflik, dan tidak kaku.',
    iconName: 'MessageSquare',
    promptCount: 5,
  },

  // REVISI
  {
    id: 'perbaiki-diksi',
    title: 'Perbaiki Diksi',
    description: 'Tingkatkan pilihan kata biasa menjadi diksi sastra bernyawa dan kaya makna.',
    iconName: 'Book',
    promptCount: 5,
  },
  {
    id: 'perkuat-emosi',
    title: 'Perkuat Emosi',
    description: "Terapkan teknik Show, Don't Tell dan perdalam keintiman emosional antartokoh.",
    iconName: 'Heart',
    promptCount: 5,
  },
  {
    id: 'proofreading',
    title: 'Proofreading',
    description: 'Periksa kesesuaian PUEBI, tanda baca dialog, typo, dan keutuhan kalimat.',
    iconName: 'CheckCheck',
    promptCount: 5,
  },
  {
    id: 'perbaiki-gaya-bahasa',
    title: 'Perbaiki Gaya Bahasa',
    description: 'Hilangkan pengulangan kata, pasif menjadi aktif, dan buat kalimat mengalir.',
    iconName: 'PenTool',
    promptCount: 5,
  },

  // PUBLISHING
  {
    id: 'buat-sinopsis',
    title: 'Buat Sinopsis',
    description: 'Rangkum keseluruhan cerita dari awal hingga akhir untuk keperluan redaksi.',
    iconName: 'FileText',
    promptCount: 5,
  },
  {
    id: 'buat-blurb',
    title: 'Buat Blurb',
    description: 'Tulis teks pemasaran belakang buku yang memancing rasa penasaran pembaca.',
    iconName: 'Megaphone',
    promptCount: 5,
  },
  {
    id: 'caption-promosi',
    title: 'Caption Promosi',
    description: 'Tulis caption peluncuran buku, quote teaser, dan promosi pre-order naskah.',
    iconName: 'Share2',
    promptCount: 5,
  },
];

export const prompts: AiPromptItem[] = [
  // 1. CARI IDE (5 Prompts)
  {
    id: 'ci-01',
    categoryId: 'cari-ide',
    title: 'Brainstorming Premis Konflik Batin',
    description: 'Gali 5 ide cerita berdasarkan tema memori, kehilangan, atau penerimaan hidup.',
    tag: 'Eksplorasi Premis',
    promptText: `Bertindaklah sebagai kurator dan editor buku antologi sastra berpengalaman.
Saya sedang merencanakan sebuah naskah antologi dengan tema besar: "[MASUKKAN TEMA: misal: Luka Masa Lalu / Rumah / Melepaskan]".

Tolong bantu saya menyusun 5 variasi premis cerita fiksi/kisah personal yang unik dan menyentuh hati. Untuk setiap premis, sertakan:
1. Premis Satu Kalimat (Tokoh utama, situasi awal, konflik batin yang dihadapi).
2. Titik Balik Emosional (Momen kritis yang mengubah tokoh).
3. Pesan / Katarsis Batin yang ingin ditinggalkan kepada pembaca.

Gunakan nada bahasa yang kontemplatif, hangat, dan manusiawi.`,
  },
  {
    id: 'ci-02',
    categoryId: 'cari-ide',
    title: 'Eksplorasi Sudut Pandang (POV Shift)',
    description: 'Uji bagaimana sebuah peristiwa terlihat dari sudut pandang tokoh yang berbeda.',
    tag: 'Sudut Pandang',
    promptText: `Saya memiliki sebuah peristiwa dasar berikut:
"[CERITAKAN SINGKAT KEJADIANNYA DI SINI: misal: Pertengkaran di meja makan sebelum salah satu anggota keluarga merantau]".

Tolong bantu saya membedah peristiwa ini ke dalam 3 sudut pandang narasi yang berbeda:
1. Sudut Pandang Orang Pertama (Tokoh yang merasa ditinggalkan/terluka).
2. Sudut Pandang Orang Pertama (Tokoh yang harus pergi mengambil keputusan sulit).
3. Sudut Pandang Orang Ketiga Pengamat (Saksi bisu atau orang yang hanya melihat dari kejauhan).

Tunjukkan kontras emosi dan detail sensorik apa yang paling menonjol pada masing-masing sudut pandang.`,
  },
  {
    id: 'ci-03',
    categoryId: 'cari-ide',
    title: 'Menemukan Simbol & Motif Cerita',
    description: 'Temukan benda atau metafora visual yang mewakili tema cerita naskahmu.',
    tag: 'Simbolisme',
    promptText: `Saya sedang menulis naskah tentang: "[JELASKAN TOPIK CERITA: misal: Rekonsiliasi antara ayah dan anak setelah 10 tahun terpisah]".

Tolong berikan 5 ide "Benda Simbolis / Motif Visual" (misal: arloji mati, resep masakan yang robek, kunci rumah lama) yang dapat digunakan sepanjang cerita sebagai jangkar emosi.

Untuk setiap simbol, jelaskan:
- Makna simbol tersebut di awal cerita.
- Pergeseran makna simbol di puncak konflik.
- Bagaimana simbol tersebut diselesaikan di akhir cerita.`,
  },
  {
    id: 'ci-04',
    categoryId: 'cari-ide',
    title: 'Transformasi Memori Nyata Menjadi Cerita Fiksi Universal',
    description: 'Ubah pengalaman pribadi yang sensitif menjadi fiksi sastra yang indah.',
    tag: 'Memoir & Fiksi',
    promptText: `Saya ingin menulis naskah yang terinspirasi dari pengalaman pribadi nyata saya:
"[TULISKAN PENGALAMAN PRIBADI SECARA JUJUR]".

Tolong bantu saya:
1. Mengidentifikasi "Kebenaran Emosional Utama" (Core Emotional Truth) dari pengalaman ini.
2. Mengembangkan 3 variasi latar dan karakterisasi fiktif agar cerita tetap menjaga privasi orang terkait namun dampak emosinya tetap kuat dan universal bagi pembaca antologi.`,
  },
  {
    id: 'ci-05',
    categoryId: 'cari-ide',
    title: 'Pembangkit Ide dari Objek / Foto Masa Lalu',
    description: 'Gali cerita mendalam dari sebuah objek nostalgia atau potret lama.',
    tag: 'Nostalgia',
    promptText: `Bayangkan sebuah cerita bermula dari sebuah benda sederhana berikut:
"[SEBUTKAN BENDA: misal: Sepasang cangkir keramik retak / Jaket lusuh bernoda cat / Kaset rekaman pita kusut]".

Bantu saya membuat 3 premis cerita antologi dengan alur yang tidak terduga, di mana rahasia di balik benda tersebut perlahan terungkap di sepanjang babak.`,
  },

  // 2. KEMBANGKAN IDE (5 Prompts)
  {
    id: 'ki-01',
    categoryId: 'kembangkan-ide',
    title: 'Dari Satu Kalimat Menjadi Tiga Babak',
    description: 'Ubah ide dasar menjadi gambaran besar cerita 3 babak.',
    tag: 'Eskalasi Ide',
    promptText: `Saya memiliki ide cerita pendek seperti ini:
"[MASUKKAN IDE SATU KALIMAT ANDA]"

Tolong kembangkan ide tersebut menjadi gambaran besar struktur 3 babak:
1. Pengenalan (Status Quo & Inciting Incident)
2. Konfrontasi (Rintangan Utama & Titik Tengah)
3. Resolusi (Klimaks & Katarsis)

Berikan penjelasan singkat untuk setiap babaknya.`,
  },
  {
    id: 'ki-02',
    categoryId: 'kembangkan-ide',
    title: 'Gali Motivasi Karakter dari Ide Cerita',
    description: 'Temukan alasan mendalam mengapa tokoh bertindak dalam ide ceritamu.',
    tag: 'Motivasi',
    promptText: `Ide cerita saya adalah: "[MASUKKAN IDE CERITA]"

Tolong kembangkan motivasi internal tokoh utamanya dengan menjawab:
1. Apa keinginan sadar (Want) mereka?
2. Apa kebutuhan tak sadar (Need) mereka?
3. Apa ketakutan terbesar yang menghalangi mereka mencapai kebutuhan tersebut (Ghost/Wound)?`,
  },
  {
    id: 'ki-03',
    categoryId: 'kembangkan-ide',
    title: 'Brainstorming Rintangan (Obstacles)',
    description: 'Temukan rintangan fisik dan emosional yang menghalangi tokoh utama.',
    tag: 'Rintangan',
    promptText: `Dalam cerita saya, tokoh utamanya memiliki tujuan berikut: "[TUJUAN TOKOH UTAMA]".

Tolong bantu saya menciptakan 5 rintangan (2 rintangan fisik/eksternal, dan 3 rintangan psikologis/internal) yang akan membuat perjalanannya semakin sulit namun menarik untuk dibaca.`,
  },
  {
    id: 'ki-04',
    categoryId: 'kembangkan-ide',
    title: 'Eksplorasi Konsekuensi (Stakes)',
    description: 'Tingkatkan taruhan cerita agar pembaca lebih peduli pada hasilnya.',
    tag: 'Taruhan Cerita',
    promptText: `Ide cerita saya berkisar pada konflik ini: "[JELASKAN KONFLIK UTAMA]".

Tolong bantu saya memperjelas Taruhan (Stakes) dalam cerita ini dengan menjawab:
1. Apa yang akan terjadi jika tokoh utama GAGAL? (Public & Personal stakes)
2. Apa yang harus dikorbankan tokoh utama jika ia INGIN BERHASIL?
3. Bagaimana cara meningkatkan taruhan tersebut di tengah cerita?`,
  },
  {
    id: 'ki-05',
    categoryId: 'kembangkan-ide',
    title: 'Kembangkan Latar Belakang Dunia (Worldbuilding Kecil)',
    description: 'Buat latar cerita menjadi lebih hidup, meski hanya untuk cerpen.',
    tag: 'Latar Cerita',
    promptText: `Cerita saya berlatar di: "[SEBUTKAN LOKASI/TEMPAT]".

Tolong berikan 5 ide detail sensorik spesifik (pemandangan, suara khas, bau, kebiasaan penduduk lokal, atau cuaca) yang bisa saya masukkan untuk membuat latar ini terasa nyata dan mendukung tema kesepian/harapan dalam cerita saya.`,
  },

  // 3. TENTUKAN TEMA (5 Prompts)
  {
    id: 'tt-01',
    categoryId: 'tentukan-tema',
    title: 'Identifikasi Tema dari Premis',
    description: 'Temukan tema universal dari plot yang sudah kamu miliki.',
    tag: 'Tema Universal',
    promptText: `Premis cerita saya adalah: "[MASUKKAN PREMIS/RINGKASAN CERITA]".

Tolong identifikasi 3 kemungkinan tema sentral (misal: "Pengampunan membutuhkan pengorbanan", atau "Cinta sejati melepaskan") yang paling relevan dengan premis tersebut. Jelaskan mengapa masing-masing tema cocok.`,
  },
  {
    id: 'tt-02',
    categoryId: 'tentukan-tema',
    title: 'Tentukan "Argumentasi" Penulis',
    description: 'Perjelas pesan moral atau pandangan hidup yang ingin disampaikan.',
    tag: 'Pesan Moral',
    promptText: `Tema cerita saya adalah tentang "[SEBUTKAN TEMA: misal: Ambisi vs Keluarga]".

Saya ingin cerita ini memiliki opini atau "Argumentasi" yang jelas di bagian akhirnya. Tolong bantu saya merumuskan 3 kemungkinan argumentasi (misal: "Ambisi yang tak terkendali akan mengorbankan keluarga" atau "Keluarga sejati akan mendukung ambisi apa pun"). 
Bantu saya memilih mana yang paling memiliki dampak emosional terdalam.`,
  },
  {
    id: 'tt-03',
    categoryId: 'tentukan-tema',
    title: 'Ekspresikan Tema Lewat Motif Visul',
    description: 'Ubah tema abstrak menjadi benda atau motif yang bisa dilihat.',
    tag: 'Motif Tema',
    promptText: `Tema cerita saya adalah: "[MASUKKAN TEMA]".

Tolong berikan 5 ide motif visual atau benda (simbol) yang bisa dimunculkan berulang kali sepanjang cerita untuk merepresentasikan tema tersebut tanpa harus menyatakannya secara eksplisit.`,
  },
  {
    id: 'tt-04',
    categoryId: 'tentukan-tema',
    title: 'Kembangkan Tema melalui Konflik Karakter',
    description: 'Gunakan karakter pendukung untuk menguji tema.',
    tag: 'Karakter & Tema',
    promptText: `Tema cerita saya adalah "[MASUKKAN TEMA]". Tokoh utama saya [PERCAYA/TIDAK PERCAYA] pada tema tersebut.

Tolong ciptakan 2 konsep karakter pendukung: 
1. Karakter Foil (yang bertolak belakang dan menentang pandangan tokoh utama tentang tema).
2. Karakter Mentor/Cermin (yang mewakili sisi lain dari tema tersebut).`,
  },
  {
    id: 'tt-05',
    categoryId: 'tentukan-tema',
    title: 'Menguji Tema di Klimaks',
    description: 'Pastikan resolusi cerita benar-benar membuktikan tema yang dipilih.',
    tag: 'Tema di Klimaks',
    promptText: `Tema utama naskah saya adalah: "[MASUKKAN TEMA]".
Dan ini adalah rencana klimaks saya: "[JELASKAN KLIMAKS]".

Tolong analisis apakah klimaks saya sudah membuktikan atau menguji tema tersebut secara maksimal? Berikan 2 saran untuk membuat momen klimaks tersebut lebih resonan dengan tema utama.`,
  },

  // 4. BUAT JUDUL (5 Prompts)
  {
    id: 'bj-01',
    categoryId: 'buat-judul',
    title: '10 Alternatif Judul Puitis & Menggugah',
    description: 'Dapatkan 10 variasi judul bernuansa sastra dengan berbagai gaya gaya bahasa.',
    tag: 'Koleksi Judul',
    promptText: `Bertindaklah sebagai editor judul buku antologi sastra.
Naskah saya menceritakan tentang: "[JELASKAN INTI CERITA ATAU TOPIKNYA]".
Emosi utama naskah: "[misal: Rindu yang tertahan / Kekecewaan yang menjadi ikhlas]".

Berikan 10 opsi judul naskah dengan variasi gaya:
- 3 Judul Singkat (1–2 kata, berbobot).
- 4 Judul Puitis Kontemplatif (3–5 kata, metaforis).
- 3 Judul Kalimat Menggantung (menimbulkan rasa penasaran).

Sertakan alasan singkat mengapa judul tersebut berdaya pikat.`,
  },
  {
    id: 'bj-02',
    categoryId: 'buat-judul',
    title: 'Judul Berbasis Paradoks & Kontras Rasa',
    description: 'Ciptakan judul yang menggabungkan dua hal berlawanan yang memikat rasa.',
    tag: 'Paradoks',
    promptText: `Bantu saya membuat 5 judul naskah antologi yang menggunakan teknik kontras / paradoks (seperti: "Menghangatkan Dingin", "Bising dalam Sunyi", "Belajar Pulang dari Perpisahan").
Inti cerita saya adalah: "[MASUKKAN INTI CERITA]".

Pastikan judul terdengar anggun, tidak klise, dan relevan dengan kisah saya.`,
  },
  {
    id: 'bj-03',
    categoryId: 'buat-judul',
    title: 'Judul Menggunakan Diksi Sastra Indonesia Indah',
    description: 'Manfaatkan diksi arkais seperti Renjana, Saujana, Swastamita, atau Arunika.',
    tag: 'Diksi Indah',
    promptText: `Saya ingin judul naskah saya memuat salah satu diksi sastra Indonesia yang indah dan mendalam (contoh: Renjana, Saujana, Nirmala, Swastamita, Senandika, Jenggala, atau lainnya).
Tema naskah: "[JELASKAN TEMA]".

Tolong pilihkan 5 diksi yang paling pas dan susun menjadi frasa judul yang berkelas dan tidak dipaksakan.`,
  },
  {
    id: 'bj-04',
    categoryId: 'buat-judul',
    title: 'Bedah dan Poles Judul yang Sudah Ada',
    description: 'Tingkatkan kualitas judul yang sedang kamu gunakan saat ini.',
    tag: 'Polish Judul',
    promptText: `Judul naskah kerja saya saat ini adalah: "[MASUKKAN JUDUL ANDA SAAT INI]".
Inti cerita: "[JELASKAN INTI CERITA]".

Tolong berikan penilaian jujur terhadap judul ini (apakah terlalu biasa, klise, atau kurang kuat?), lalu tawarkan 5 versi perbaikan yang lebih memikat bagi pembaca buku antologi.`,
  },
  {
    id: 'bj-05',
    categoryId: 'buat-judul',
    title: 'Judul Berdasarkan Kutipan Kunci Naskah',
    description: 'Ambil intisari kalimat terkuat di dalam naskah untuk dijadikan judul.',
    tag: 'Kutipan Judul',
    promptText: `Berikut adalah kutipan paragraf/kalimat terbaik dari naskah saya:
"[MASUKKAN KUTIPAN TERBAIK DARI NASKAHMU]".

Bantu saya mengekstrak 5 ide judul potensial yang bersumber langsung dari jiwa kutipan di atas.`,
  },

  // 5. BUAT OUTLINE (5 Prompts)
  {
    id: 'bo-01',
    categoryId: 'buat-outline',
    title: 'Struktur Alur 3 Babak Klasik (1000 Kata)',
    description: 'Susun outline seimbang antara pengenalan, eskalasi, dan resolusi cerita.',
    tag: '3 Babak',
    promptText: `Bertindaklah sebagai ahli struktur naratif.
Saya ingin menulis naskah antologi dengan target panjang 1000 kata.
Premis cerita saya: "[MASUKKAN PREMIS CERITA]".

Tolong buatkan outline naskah terperinci dengan pembagian:
1. Babak 1: Titik Mula & Pembuka (±150 kata) — Penetapan latar, suasana hati, dan pemantik awal.
2. Babak 2A: Eskalasi Konflik (±300 kata) — Pergulatan rasa dan interaksi kunci.
3. Babak 2B: Titik Balik / Klimaks Emosi (±350 kata) — Puncak ketegangan batin atau keputusan krusial.
4. Babak 3: Resolusi & Katarsis (±200 kata) — Makna baru dan penutup kontemplatif.

Berikan poin-poin adegan konkret di setiap babak.`,
  },
  {
    id: 'bo-02',
    categoryId: 'buat-outline',
    title: 'Struktur Flash Narrative / Vignette (500 Kata)',
    description: 'Outline padat dan fokus untuk cerita pendek beraliran puitis.',
    tag: '500 Kata',
    promptText: `Saya membutuhkan outline untuk naskah singkat (Flash Essay / Vignette) sepanjang 500 kata.
Topik cerita: "[MASUKKAN TOPIK/PERISTIWA]".

Susun outline ringkas dan tajam dengan 3 bagian:
- Scene 1: Visual Hook & Atmosfer Batin (100 kata)
- Scene 2: Retakan Rasa & Perenungan Konflik (300 kata)
- Scene 3: Pelepasan & Kalimat Gaung Akhir (100 kata)

Pastikan setiap bagian memiliki instruksi emosi spesifik bagi penulis.`,
  },
  {
    id: 'bo-03',
    categoryId: 'buat-outline',
    title: 'Outline Struktur Non-Linear / Kilas Balik',
    description: 'Struktur alur bolak-balik antara masa kini dan masa lalu secara mulus.',
    tag: 'Alur Maju-Mundur',
    promptText: `Saya ingin menulis cerita dengan alur bolak-balik (non-linear) antara masa kini dan masa lalu.
Peristiwa masa kini: "[PERISTIWA HARI INI]"
Peristiwa masa lalu: "[MEMORI 10 TAHUN LALU]"

Bantu saya menyusun outline 5 sekuens adegan yang bergantian dengan jembatan transisi sensorik (seperti suara, aroma, atau benda pemicu memori) agar pembaca tidak bingung.`,
  },
  {
    id: 'bo-04',
    categoryId: 'buat-outline',
    title: 'Pemetaan Pacing & Eskalasi Ketegangan Batin',
    description: 'Atur grafik emosi agar cerita tidak terasa datar di tengah naskah.',
    tag: 'Pacing & Tempo',
    promptText: `Berikut adalah ringkasan draf/ide cerita saya:
"[JELASKAN RINGKASAN CERITA]".

Tolong evaluasi ritme (pacing) cerita ini dan buatkan kurva eskalasi emosi per paragraf. Beri tahu saya:
1. Di paragraf mana tempo narasi harus diperlambat untuk menonjolkan detail rasa.
2. Di paragraf mana tempo narasi harus dipercepat untuk membangun ketegangan.
3. Di mana letak puncak keheningan batin sebelum klimaks.`,
  },
  {
    id: 'bo-05',
    categoryId: 'buat-outline',
    title: 'Outline Naskah Dialog Mendalam (Dua Tokoh)',
    description: 'Fokus pada percakapan penting yang membongkar rahasia di antara dua orang.',
    tag: 'Fokus Dialog',
    promptText: `Saya ingin menulis naskah antologi yang intinya bertumpu pada percakapan jujur antara dua orang tokoh: [TOKOH A] dan [TOKOH B] di tempat [LATAR LOKASI].

Buatkan outline adegan demi adegan yang memandu bagaimana percakapan mereka bermula dari obrolan basa-basi dingin, meningkat menjadi saling menuntut kejujuran, hingga berakhir pada penerimaan.`,
  },

  // 6. BANGUN ALUR (5 Prompts)
  {
    id: 'ba-01',
    categoryId: 'bangun-alur',
    title: 'Merumuskan Inciting Incident',
    description: 'Temukan kejadian pemicu yang merusak keseimbangan hidup tokoh.',
    tag: 'Plot Point',
    promptText: `Saya sedang membangun alur cerita tentang: "[TOPIK CERITA]".

Tolong berikan 3 ide "Inciting Incident" (kejadian pemicu) yang memaksa tokoh utama keluar dari zona nyamannya dan memulai cerita. Kejadian ini harus terasa tak terhindarkan dan memiliki bobot emosional.`,
  },
  {
    id: 'ba-02',
    categoryId: 'bangun-alur',
    title: 'Membangun Midpoint (Titik Tengah Cerita)',
    description: 'Ciptakan momen di tengah cerita yang mengubah arah tokoh.',
    tag: 'Midpoint',
    promptText: `Cerita saya memiliki konflik: "[JELASKAN KONFLIK]". 

Saya butuh ide untuk "Midpoint" (titik tengah). Buatkan 3 skenario di mana tokoh utama menyadari bahwa strateginya selama ini salah, atau mendapatkan informasi baru yang mengubah secara total cara dia menghadapi masalah.`,
  },
  {
    id: 'ba-03',
    categoryId: 'bangun-alur',
    title: 'Menciptakan "All Is Lost" Moment',
    description: 'Bawa tokoh ke titik terendah sebelum mereka bangkit di klimaks.',
    tag: 'All is Lost',
    promptText: `Tokoh saya sedang berusaha mencapai: "[TUJUAN TOKOH]".

Sebelum klimaks, tokoh harus mengalami momen "All is Lost" (Semua Harapan Hilang). Berikan 3 ide adegan di mana tokoh merasa telah gagal total secara fisik maupun emosional, sehingga mereka harus melakukan refleksi mendalam sebelum bangkit.`,
  },
  {
    id: 'ba-04',
    categoryId: 'bangun-alur',
    title: 'Klimaks yang Membayar Janji Premis',
    description: 'Rancang pertarungan akhir (fisik/batin) yang paling epik.',
    tag: 'Klimaks',
    promptText: `Premis cerita saya: "[MASUKKAN PREMIS]".
Kelemahan terbesar tokoh utama: "[MASUKKAN KELEMAHAN (FLAW)]".

Tolong rancang sebuah momen Klimaks (Puncak Cerita) di mana tokoh HANYA BISA menang/berhasil jika mereka mengatasi kelemahan terbesar mereka tersebut.`,
  },
  {
    id: 'ba-05',
    categoryId: 'bangun-alur',
    title: 'Menyatukan Subplot ke Main Plot',
    description: 'Pastikan cerita sampingan mendukung tema cerita utama.',
    tag: 'Subplot',
    promptText: `Plot Utama cerita saya: "[JELASKAN PLOT UTAMA]".
Subplot (cerita sampingan) saya: "[JELASKAN SUBPLOT]".

Tolong berikan ide bagaimana mengaitkan subplot ini agar pada akhirnya membantu penyelesaian konflik di Plot Utama, baik secara tematik maupun logis.`,
  },

  // 7. BANGUN KARAKTER (5 Prompts)
  {
    id: 'bk-01',
    categoryId: 'bangun-karakter',
    title: 'Wawancara Psikologis Karakter Utama',
    description: 'Kenali karaktermu lebih dalam lewat pertanyaan wawancara.',
    tag: 'Wawancara',
    promptText: `Karakter utama saya bernama [NAMA KARAKTER]. Dia adalah seorang [PEKERJAAN/PERAN] yang sedang [SITUASI SAAT INI].

Tolong berikan 5 pertanyaan wawancara psikologis mendalam untuk karakter ini, dan bantu jawab pertanyaan tersebut dari sudut pandang (POV) si karakter menggunakan gaya bicaranya.`,
  },
  {
    id: 'bk-02',
    categoryId: 'bangun-karakter',
    title: 'Membangun Karakter Melalui Kontradiksi',
    description: 'Buat karakter terasa manusiawi dengan memberinya sifat yang bertolak belakang.',
    tag: 'Kontradiksi',
    promptText: `Saya sedang menciptakan karakter bernama [NAMA KARAKTER]. Karakteristik utamanya adalah [SIFAT UTAMA, misal: Sangat disiplin dan kaku].

Untuk membuatnya lebih manusiawi dan 3D, berikan 3 ide sifat kontradiktif (paradoks) yang tersembunyi dalam dirinya (misal: diam-diam suka menonton film kartun musikal), beserta alasan logis/psikologis mengapa dia memiliki sisi tersebut.`,
  },
  {
    id: 'bk-03',
    categoryId: 'bangun-karakter',
    title: 'Menciptakan "Luka Masa Lalu" (Ghost)',
    description: 'Temukan trauma atau memori buruk yang membentuk perilaku karakter.',
    tag: 'Trauma Karakter',
    promptText: `Karakter saya memiliki kelemahan (flaw) berupa: "[SEBUTKAN KELEMAHAN, misal: Sulit percaya pada orang lain]".

Tolong ciptakan 3 ide "Luka Masa Lalu" (Ghost/Trauma) yang spesifik dan emosional yang terjadi di masa lalu karakter ini, sehingga membenarkan mengapa dia memiliki kelemahan tersebut hari ini.`,
  },
  {
    id: 'bk-04',
    categoryId: 'bangun-karakter',
    title: 'Mendesain Karakter Antagonis Berdimensi',
    description: 'Buat tokoh lawan yang memiliki motivasi logis, bukan sekadar jahat.',
    tag: 'Antagonis',
    promptText: `Tokoh utama saya menginginkan: "[TUJUAN TOKOH UTAMA]".
Antagonis/Lawan dalam cerita ini adalah: "[SIAPA ANTAGONISNYA]".

Tolong berikan latar belakang yang kuat bagi Antagonis ini. Buatlah motivasinya sangat logis, dapat dipahami, dan bahkan membuat pembaca merasa bahwa dari sudut pandangnya, si Antagonis adalah pahlawannya.`,
  },
  {
    id: 'bk-05',
    categoryId: 'bangun-karakter',
    title: 'Dinamika Relasi Karakter (Chemistry)',
    description: 'Ciptakan percikan dan sejarah antar dua karakter yang berinteraksi.',
    tag: 'Relasi Karakter',
    promptText: `Dua karakter saya, [KARAKTER A] dan [KARAKTER B], memiliki hubungan sebagai [STATUS HUBUNGAN, misal: Sahabat lama yang sempat putus kontak].

Tolong buatkan detail dinamika hubungan mereka:
1. Satu rahasia yang disimpan A dari B.
2. Satu kebiasaan kecil yang selalu mereka lakukan bersama.
3. Alasan utama mengapa mereka saling membutuhkan meski sering berkonflik.`,
  },

  // 8. BUAT SCENE (5 Prompts)
  {
    id: 'bs-01',
    categoryId: 'buat-scene',
    title: 'Merancang Scene Goal, Conflict, Disaster',
    description: 'Gunakan struktur adegan klasik agar setiap bab terasa penting.',
    tag: 'Struktur Scene',
    promptText: `Saya akan menulis sebuah scene di mana [TOKOH] sedang [LAKUKAN AKTIVITAS] di [LOKASI].

Tolong bantu rancang struktur mikro scene ini:
1. Goal: Apa tujuan tokoh SAAT INI (di dalam adegan ini saja)?
2. Conflict: Siapa/apa yang menghalanginya?
3. Disaster: Apa konsekuensi buruk (kegagalan/kemunduran) yang terjadi di akhir adegan ini untuk mendorong cerita ke depan?`,
  },
  {
    id: 'bs-02',
    categoryId: 'buat-scene',
    title: 'Membangun Suasana (Mood) Latar',
    description: 'Deskripsikan lokasi agar mencerminkan emosi tokoh.',
    tag: 'Setting & Mood',
    promptText: `Saya butuh mendeskripsikan latar tempat: "[MASUKKAN NAMA TEMPAT]". 
Suasana emosi tokoh yang sedang berada di sana adalah: "[MASUKKAN EMOSI TOKOH]".

Tolong tuliskan draf paragraf deskripsi latar (sekitar 100 kata) yang menyoroti detail sensorik sedemikian rupa sehingga mencerminkan perasaan (mood) tokoh tanpa menyebutkan perasaannya secara langsung.`,
  },
  {
    id: 'bs-03',
    categoryId: 'buat-scene',
    title: 'Transisi Adegan (Scene Transition)',
    description: 'Sambungkan dua adegan yang berbeda waktu/tempat secara mulus.',
    tag: 'Transisi',
    promptText: `Saya memiliki Adegan 1 yang berakhir dengan: "[AKHIR ADEGAN 1]".
Dan saya harus melompat ke Adegan 2 yang berlatar di: "[AWAL ADEGAN 2, beda waktu/tempat]".

Tolong berikan 3 contoh kalimat/paragraf transisi yang mulus, puitis, atau menggunakan objek visual yang sama (match cut) untuk menghubungkan kedua adegan tersebut.`,
  },
  {
    id: 'bs-04',
    categoryId: 'buat-scene',
    title: 'Menulis Adegan Aksi yang Cepat',
    description: 'Gunakan kalimat pendek dan ritme cepat untuk ketegangan tinggi.',
    tag: 'Adegan Aksi',
    promptText: `Tulis ulang kejadian aksi/pertengkaran fisik berikut ini agar terasa lebih tegang, cepat, dan berbahaya:
"[JELASKAN KEJADIAN AKSI SECARA SINGKAT]".

Gunakan kalimat-kalimat pendek, potong kata sifat yang tidak perlu, dan fokus pada gerak (verb) serta dampak fisik/sensorik.`,
  },
  {
    id: 'bs-05',
    categoryId: 'buat-scene',
    title: 'Adegan Epiphany (Penemuan Diri)',
    description: 'Tulis momen hening saat karakter menyadari kebenaran penting.',
    tag: 'Epiphany',
    promptText: `Dalam adegan ini, karakter utama tiba-tiba menyadari suatu kebenaran besar: "[MASUKKAN KEBENARAN/EPIPHANY]".

Tolong tuliskan sebuah adegan singkat yang tenang, di mana pemicu kesadaran tersebut hanyalah hal kecil di sekitarnya (seperti melihat debu yang menari di cahaya matahari, atau mendengar suara jam). Buat pergeseran internal ini terasa sangat bermakna.`,
  },

  // 9. KEMBANGKAN PARAGRAF (5 Prompts)
  {
    id: 'kp-01',
    categoryId: 'kembangkan-paragraf',
    title: 'Lanjutkan Paragraf yang Terhenti',
    description: 'Mintalah AI melanjutkan kalimat terakhirmu agar ide kembali mengalir.',
    tag: 'Writer Block',
    promptText: `Saya sedang mengalami kebuntuan. Berikut adalah kalimat terakhir yang saya tulis di naskah:
"[PASTE KALIMAT TERAKHIR ANDA]".

Konteks cerita: "[BERI SEDIKIT KONTEKS]".
Tolong lanjutkan tulisan tersebut sebanyak 2 paragraf ke depan dengan menjaga gaya bahasa dan suasana yang sama.`,
  },
  {
    id: 'kp-02',
    categoryId: 'kembangkan-paragraf',
    title: 'Perdalam Deskripsi Karakter Baru',
    description: 'Kembangkan pengenalan karakter agar tidak hanya deskripsi fisik biasa.',
    tag: 'Deskripsi Karakter',
    promptText: `Saya memperkenalkan karakter baru di paragraf ini:
"[PASTE PARAGRAF PENGENALAN KARAKTER]".

Tolong kembangkan paragraf ini agar tidak sekadar mendeskripsikan ciri fisik, tetapi juga menunjukkan "kepribadian" karakter tersebut melalui bahasa tubuh, pakaian yang dipilihnya, dan bagaimana dia berinteraksi dengan benda di sekitarnya.`,
  },
  {
    id: 'kp-03',
    categoryId: 'kembangkan-paragraf',
    title: 'Mengurai Detail Sensorik yang Terlewat',
    description: 'Tambahkan elemen panca indra pada paragraf yang terasa hambar.',
    tag: 'Sensory Detail',
    promptText: `Paragraf saya ini terasa kurang hidup:
"[PASTE PARAGRAF]".

Tolong perbesar/zoom-in paragraf ini dengan menambahkan detail untuk setidaknya 3 panca indra (misal: aroma khas, suara di latar belakang, dan sensasi tekstur). Tulis ulang agar pembaca benar-benar merasa berada di sana.`,
  },
  {
    id: 'kp-04',
    categoryId: 'kembangkan-paragraf',
    title: 'Kembangkan Analogi dan Metafora',
    description: 'Buat perbandingan puitis untuk menjelaskan perasaan abstrak.',
    tag: 'Metafora',
    promptText: `Saya memiliki kalimat sederhana ini: "[MASUKKAN KALIMAT SEDERHANA, misal: Rasa sakitnya sungguh luar biasa]".

Tolong kembangkan kalimat tersebut menjadi sebuah paragraf utuh yang menggunakan metafora atau analogi yang indah (misal, membandingkannya dengan fenomena alam, kerusakan mekanis, atau memori masa kecil).`,
  },
  {
    id: 'kp-05',
    categoryId: 'kembangkan-paragraf',
    title: 'Teknik "Tampilkan Reaksi Internal"',
    description: 'Setelah sebuah aksi besar, perlihatkan bagaimana tubuh dan pikiran tokoh merespons.',
    tag: 'Reaksi Internal',
    promptText: `Seseorang baru saja mengucapkan kalimat ini kepada tokoh utama: "[MASUKKAN DIALOG/AKSI]".

Tolong buat satu paragraf yang berfokus SEPENUHNYA pada reaksi internal tokoh utama selama 5 detik pertama setelah mendengar/melihat hal tersebut. Fokus pada denyut nadi, pikiran yang berpacu, atau kelumpuhan sesaat.`,
  },

  // 10. KALIMAT PEMBUKA (5 Prompts) - Preserved existing
  {
    id: 'klp-01',
    categoryId: 'kalimat-pembuka',
    title: 'Hook Pembuka Aksi & Gerak Tokoh',
    description: 'Mulai cerita langsung di tengah adegan tanpa bertele-tele.',
    tag: 'In Media Res',
    promptText: `Saya ingin membuat paragraf pembuka naskah dengan teknik *In Media Res* (langsung masuk ke tengah aksi adegan).
Adegan pembukanya adalah: "[JELASKAN ADEGAN AWAL: misal: Tokoh sedang mengepak koper terburu-buru di tengah malam]".

Tolong buatkan 3 alternatif paragraf pembuka (masing-masing 2–4 kalimat) yang langsung mencengkeram perhatian pembaca sejak kata pertama.`,
  },
  {
    id: 'klp-02',
    categoryId: 'kalimat-pembuka',
    title: 'Hook Pembuka Berbasis Pengamatan Sensorik',
    description: 'Bangun suasana atmosferik lewat panca indra (bau, suara, suhu).',
    tag: 'Sensorik & Detail',
    promptText: `Bantu saya menulis kalimat pembuka naskah yang mengandalkan kepekaan panca indra (suara rintik di seng, aroma kopi dingin, atau gemetar ujung jemari).
Latar tempat: "[TEMPAT CERITA]"
Suasana hati: "[PERASAAN TOKOH]"

Berikan 4 opsi kalimat pembuka yang puitis, hening, dan visual.`,
  },
  {
    id: 'klp-03',
    categoryId: 'kalimat-pembuka',
    title: 'Hook Pernyataan Paradoksal / Filosofis',
    description: 'Mulai dengan satu kebenaran hidup yang mengejutkan atau kontemplatif.',
    tag: 'Kontemplatif',
    promptText: `Saya ingin membuka naskah saya dengan satu pernyataan batin yang kuat dan berani tentang: "[TOPIK: misal: Memaafkan orang yang tidak pernah meminta maaf]".

Tuliskan 5 opsi kalimat pembuka pertama yang terdengar seperti kutipan sastra klasik yang tak terlupakan.`,
  },
  {
    id: 'klp-04',
    categoryId: 'kalimat-pembuka',
    title: 'Re-write Paragraf Pembuka yang Terasa Kaku',
    description: 'Poles paragraf pembuka yang ada agar lebih mengalir dan hidup.',
    tag: 'Rewrite Pembuka',
    promptText: `Berikut adalah paragraf pembuka naskah yang sudah saya tulis:
"[PASTE PARAGRAF PEMBUKA ANDA DI SINI]".

Tolong perbaiki paragraf ini menjadi 3 versi:
1. Versi Lebih Puitis & Sastrawi.
2. Versi Lebih Minimalis & Tajam.
3. Versi Lebih Emosional & Menghanyutkan.`,
  },
  {
    id: 'klp-05',
    categoryId: 'kalimat-pembuka',
    title: 'Hook Pembuka Berbasis Dialog Menghentak',
    description: 'Gunakan satu baris dialog tajam sebagai kalimat pembuka naskah.',
    tag: 'Dialog Pembuka',
    promptText: `Saya ingin membuka cerita langsung dengan satu baris dialog yang membuat pembaca bertanya-tanya apa yang sedang terjadi.
Topik konflik: "[KONFLIK TOKOH]".

Berikan 5 opsi kalimat dialog pembuka beserta aksi fisik penyerta tokohnya.`,
  },

  // 11. KALIMAT PENUTUP (5 Prompts) - Preserved existing
  {
    id: 'kt-01',
    categoryId: 'kalimat-penutup',
    title: 'Ending Reflektif yang Mengendap Tenang',
    description: 'Tutup cerita dengan kelegaan dan penerimaan yang tidak menggurui.',
    tag: 'Penerimaan',
    promptText: `Naskah saya menceritakan tentang: "[RINGKASAN AKHIR CERITA]".
Pesan batin yang ingin dicapai tokoh: "[misal: Berdamai dengan takdir dan belajar melangkah lagi]".

Tolong buatkan 4 opsi paragraf penutup (2–4 kalimat) yang memberikan rasa hangat, melegakan, dan tidak terkesan memberi nasihat klise.`,
  },
  {
    id: 'kt-02',
    categoryId: 'kalimat-penutup',
    title: 'Circular Ending (Menautkan Kembali ke Awal)',
    description: 'Ikat akhir cerita dengan elemen yang muncul pada kalimat pertama.',
    tag: 'Circular Ending',
    promptText: `Paragraf pembuka naskah saya adalah:
"[PASTE PARAGRAF PEMBUKA]".

Inti perjalanan cerita: "[JELASKAN PERUBAHAN TOKOH]".

Tolong bantu saya merangkai 3 opsi paragraf penutup yang merujuk kembali pada simbol/suasana di paragraf pembuka tadi, namun dengan makna batin yang sudah bertransformasi.`,
  },
  {
    id: 'kt-03',
    categoryId: 'kalimat-penutup',
    title: 'Ending dengan Metafora Lanskap / Waktu',
    description: 'Gunakan perubahan alam (senja, fajar, musim) sebagai penutup adegan.',
    tag: 'Metafora Alam',
    promptText: `Saya ingin menutup naskah saya dengan metafora peralihan waktu (misal: fajar yang mulai menyingsing, kabut yang terangkat, atau jalanan kota yang kembali sunyi).
Makna akhir cerita: "[MAKNA AKHIR]".

Buatkan 3 kalimat penutup yang melankolis namun memberi harapan baru.`,
  },
  {
    id: 'kt-04',
    categoryId: 'kalimat-penutup',
    title: 'Memoles Kalimat Terakhir yang Terasa Menggantung',
    description: 'Sempurnakan kalimat pamungkas agar memiliki denting resonansi yang kuat.',
    tag: 'Punchline Ending',
    promptText: `Berikut adalah draf paragraf penutup saya:
"[PASTE DRAF PENUTUP ANDA]".

Tolong evaluasi dan berikan 3 alternatif kalimat terakhir (punchline ending) yang paling menggetarkan hati pembaca.`,
  },
  {
    id: 'kt-05',
    categoryId: 'kalimat-penutup',
    title: 'Ending Pelepasan & Keikhlasan',
    description: 'Ciptakan penutup untuk cerita tentang kehilangan atau merelakan seseorang.',
    tag: 'Keikhlasan',
    promptText: `Naskah saya adalah tentang proses merelakan seseorang/sesuatu yang sangat berharga.
Bantu saya menyusun 4 opsi kalimat penutup yang lembut, jujur, dan menyentuh ranah terdalam tentang arti melepaskan tanpa dendam.`,
  },

  // 12. BUAT DIALOG (5 Prompts)
  {
    id: 'bd-01',
    categoryId: 'buat-dialog',
    title: 'Menyempurnakan Dialog yang Kaku',
    description: 'Buat percakapan terasa lebih natural seperti orang berbicara di dunia nyata.',
    tag: 'Natural Dialog',
    promptText: `Percakapan ini terasa terlalu formal dan kaku:
"[PASTE DIALOG ANDA]".

Tolong tulis ulang dialog tersebut agar terdengar sangat natural, menggunakan gaya bicara sehari-hari yang santai, interupsi, kalimat terpotong, atau jeda bernapas yang wajar.`,
  },
  {
    id: 'bd-02',
    categoryId: 'buat-dialog',
    title: 'Menambahkan Subtext pada Dialog Hambar',
    description: 'Buat tokoh membicarakan hal lain, padahal maksudnya berbeda.',
    tag: 'Subtext',
    promptText: `Dua tokoh sedang membicarakan: "[TOPIK PERMUKAAN, misal: Cara menyeduh kopi]".
Namun masalah SEBENARNYA di antara mereka adalah: "[TOPIK SEBENARNYA, misal: Sang suami ketahuan berbohong]".

Tolong buatkan dialog di mana mereka HANYA membahas topik permukaan, namun ketegangan dan rasa marah dari topik sebenarnya sangat terasa melalui pilihan kata dan penekanan nada bicara.`,
  },
  {
    id: 'bd-03',
    categoryId: 'buat-dialog',
    title: 'Dialog Argumentasi yang Seimbang',
    description: 'Buat pertengkaran di mana kedua belah pihak memiliki poin yang benar.',
    tag: 'Argumen Seimbang',
    promptText: `Tokoh A dan Tokoh B sedang bertengkar hebat tentang: "[TOPIK PERTENGKARAN]".
Tokoh A percaya bahwa "[PANDANGAN A]". Tokoh B percaya bahwa "[PANDANGAN B]".

Tuliskan dialog pertengkaran yang intens. Pastikan TIDAK ADA yang terlihat sepenuhnya jahat atau sepenuhnya benar; berikan argumen logis dan emosional yang sekuat mungkin untuk kedua belah pihak.`,
  },
  {
    id: 'bd-04',
    categoryId: 'buat-dialog',
    title: 'Ganti Tag Dialog ("Ucapnya", "Katanya") dengan Action Beats',
    description: 'Hilangkan kata penunjuk dialog dengan aksi fisik tokoh.',
    tag: 'Action Beats',
    promptText: `Teks dialog saya memiliki terlalu banyak kata "ucapnya", "katanya", atau "tanyanya":
"[PASTE TEKS DIALOG]".

Tolong perbaiki dengan menghapus tag dialog tersebut dan menggantinya dengan "Action Beats" (deskripsi gerakan mikro, gestur, atau ekspresi wajah tokoh sebelum/sesudah mereka berbicara).`,
  },
  {
    id: 'bd-05',
    categoryId: 'buat-dialog',
    title: 'Dialog Keheningan (The Power of Silence)',
    description: 'Tulis dialog yang didominasi oleh keengganan berbicara.',
    tag: 'Keheningan',
    promptText: `Situasi: "[JELASKAN SITUASI, misal: Dua teman lama bertemu di pemakaman]".

Tuliskan sebuah "dialog keheningan". Biarkan tokoh lebih banyak diam, merespons dengan anggukan lambat, hela napas, atau membuang muka. Biarkan sekeliling mereka (suara angin, rintik hujan) mengisi kekosongan percakapan tersebut.`,
  },

  // 13. PERBAIKI DIKSI (5 Prompts) - Preserved existing
  {
    id: 'pd-01',
    categoryId: 'perbaiki-diksi',
    title: 'Meningkatkan Kualitas Diksi Biasa Menjadi Sastra',
    description: 'Ganti kata-kata pasaran dengan sinonim sastra yang kaya dan bernyawa.',
    tag: 'Enhance Diksi',
    promptText: `Bertindaklah sebagai editor gaya bahasa sastra.
Berikut adalah cuplikan paragraf dari naskah saya:
"[PASTE PARAGRAF YANG INGIN DIPERBAIKI]".

Tolong perbaiki paragraf ini dengan mengganti kata-kata yang terlalu umum menjadi diksi sastra Indonesia yang anggun dan berbobot tanpa membuatnya terasa berlebihan atau sulit dipahami.
Tunjukkan tabel perbandingan kata sebelum dan sesudah.`,
  },
  {
    id: 'pd-02',
    categoryId: 'perbaiki-diksi',
    title: 'Menghapus Klise & Frasa Pasaran',
    description: 'Temukan ungkapan klise yang sering diulang dan gantikan dengan metafora segar.',
    tag: 'Hapus Klise',
    promptText: `Periksa teks berikut ini:
"[PASTE TEKS ANDA]".

Tolong identifikasi seluruh ungkapan klise (misal: "bagai disambar petir", "air mata bercucuran", "hati hancur berkeping-keping"), dan ganti setiap klise tersebut dengan 2 alternatif metafora baru yang orisinal dan segar.`,
  },
  {
    id: 'pd-03',
    categoryId: 'perbaiki-diksi',
    title: 'Membangun Ritme Kalimat & Aliterasi Indah',
    description: 'Rapikan panjang-pendek kalimat agar enak dibaca dengan suara lantang.',
    tag: 'Ritme & Musikalitas',
    promptText: `Berikut adalah naskah saya:
"[PASTE PARAGRAF ANDA]".

Tolong tata ulang struktur kalimatnya agar memiliki irama baca yang musikal (variasi kalimat pendek untuk penekanan dan kalimat panjang yang mengalir), sehingga sangat nyaman saat dibacakan secara vokal.`,
  },
  {
    id: 'pd-04',
    categoryId: 'perbaiki-diksi',
    title: 'Eksplorasi Kata Kerja Sensorik Aktif',
    description: 'Ganti kata kerja pasif menjadi kata kerja aktif yang memicu imajinasi visual.',
    tag: 'Kata Kerja Sensorik',
    promptText: `Tolong ubah kalimat-kalimat deskriptif berikut agar menggunakan kata kerja sensorik yang lebih tajam dan hidup:
"[PASTE BEBERAPA KALIMAT DESKRIPSI ANDA]".

Fokus pada penguatan visualisasi, bunyi, dan sensasi sentuhan fisik tokoh.`,
  },
  {
    id: 'pd-05',
    categoryId: 'perbaiki-diksi',
    title: 'Harmonisasi Nada Bahasa (Tone Consistency)',
    description: 'Pastikan nada bahasa dari awal hingga akhir konsisten tidak melompat.',
    tag: 'Konsistensi Nada',
    promptText: `Berikut adalah potongan bagian awal dan bagian tengah naskah saya:
"[PASTE POTONGAN TEKS]".

Tolong cek apakah nada bahasanya (apakah melankolis, puitis, santai, atau formal) sudah serasi dan tidak saling bertabrakan. Berikan rekomendasi perbaikan kalimat yang terasa melenceng dari suasana utama.`,
  },

  // 14. PERKUAT EMOSI (5 Prompts) - Preserved existing (renamed perbaiki-emosi)
  {
    id: 'pe-01',
    categoryId: 'perkuat-emosi',
    title: "Show, Don't Tell: Mengubah Pernyataan Menjadi Gestur",
    description: 'Ubah kalimat yang hanya "memberitahu" menjadi adegan nyata yang terasa di tubuh.',
    tag: "Show Don't Tell",
    promptText: `Tolong bantu saya menerapkan teknik *Show, Don't Tell* pada potongan naskah berikut:
"[PASTE POTONGAN NASKAH YANG MASIH BANYAK 'TELLING']".

Ubah pernyataan emosi abstrak (misal: "Dia sangat sedih dan kecewa") menjadi detail reaksi fisik konkret (gerak napas, tatapan mata, gemetar tangan, ketegangan otot leher, atau keheningan yang canggung).
Berikan 3 variasi penggambaran.`,
  },
  {
    id: 'pe-02',
    categoryId: 'perkuat-emosi',
    title: 'Memperdalam Monolog Batin & Kejujuran Tokoh',
    description: 'Buka lapisan pikiran terdalam yang paling rentan dan manusiawi dari tokoh.',
    tag: 'Kejujuran Batin',
    promptText: `Pada adegan berikut, tokoh saya sedang mengalami dilema batin:
"[JELASKAN DILEMA ATAU PASTE PARAGRAF SAAT INI]".

Tolong perdalam monolog batin tokoh agar terasa lebih rentan, jujur, dan tidak berpura-pura kuat. Biarkan pembaca merasakan detak kebingungan dan kepedihan yang nyata di dalam benaknya.`,
  },
  {
    id: 'pe-03',
    categoryId: 'perkuat-emosi',
    title: 'Membangun Ketegangan Batin Antara Dua Tokoh',
    description: 'Ciptakan adegan di mana hal yang tidak terucap jauh lebih berat daripada dialog.',
    tag: 'Subtext & Hening',
    promptText: `Saya ingin menulis adegan pertemuan dua tokoh yang menyimpan luka lama di antara mereka.
Tolong bantu saya menyusun interaksi yang kaya akan *subtext* (hal-hal yang sengaja disembunyikan di balik tatapan, jeda panjang percakapan, dan aksi meminum kopi).
Berikan draf adegan 200–300 kata.`,
  },
  {
    id: 'pe-04',
    categoryId: 'perkuat-emosi',
    title: 'Menghadirkan Duka / Kehilangan Tanpa Menjadi Melodramatis',
    description: 'Sentuh hati pembaca secara elegan tanpa terkesan berlebihan atau meratap.',
    tag: 'Duka Elegan',
    promptText: `Adegan naskah saya menceritakan tentang momen kehilangan orang/tempat tercinta:
"[JELASKAN PERISTIWA KEHILANGAN]".

Tolong tuliskan ulang adegan ini dengan pendekatan yang tenang, hening, dan terhormat. Hindari drama berlebihan (meratap/menjerit); fokuskan pada kehampaan di sudut ruangan dan rutinitas kecil yang kini terasa berbeda.`,
  },
  {
    id: 'pe-05',
    categoryId: 'perkuat-emosi',
    title: 'Memperkuat Momen Katarsis & Rekonsiliasi Batin',
    description: 'Hadirkan pelepasan emosi yang membuat pembaca menarik napas lega.',
    tag: 'Katarsis',
    promptText: `Saya ingin momen rekonsiliasi/klimaks batin dalam cerita saya berikut ini terasa menggetarkan:
"[PASTE DRAF ADEGAN REKONSILIASI]".

Bantu saya memoles kata-katanya agar momen saat tokoh akhirnya memaafkan/merelakan terasa seperti beban berat yang perlahan terangkat dari dada.`,
  },

  // 15. PROOFREADING (5 Prompts) - Preserved existing
  {
    id: 'pr-01',
    categoryId: 'proofreading',
    title: 'Pemeriksaan PUEBI, Typo & Ejaan Baku',
    description: 'Deteksi kesalahan ketik, kata tidak baku, dan ejaan sesuai KBBI/PUEBI.',
    tag: 'PUEBI & KBBI',
    promptText: `Bertindaklah sebagai korektor naskah (proofreader) profesional berstandar penerbit mayor.
Tolong periksa teks berikut:
"[PASTE NASKAH ANDA DI SINI]".

Lakukan pemeriksaan mendalam terhadap:
1. Typo / salah ketik.
2. Kata tidak baku (ubah ke bentuk baku KBBI: misal 'sekedar' -> 'sekadar', 'merubah' -> 'mengubah').
3. Penulisan imbuhan 'di-' (sebagai awalan vs kata depan penunjuk tempat).

Sajikan hasil koreksi dalam format daftar yang rapi dan sertakan teks utuh yang sudah bersih.`,
  },
  {
    id: 'pr-02',
    categoryId: 'proofreading',
    title: 'Koreksi Format Tanda Baca Dialog',
    description: 'Rapikan tanda petik dua, koma, titik, dan huruf kapital pada percakapan.',
    tag: 'Tanda Baca Dialog',
    promptText: `Berikut adalah naskah saya yang memuat percakapan antar tokoh:
"[PASTE TEKS DIALOG ANDA]".

Tolong rapikan seluruh tanda baca dialog sesuai aturan penulisan sastra resmi Indonesia:
- Letak tanda koma/titik di dalam tanda petik.
- Huruf kapital atau kecil pada dialog tag (ucapnya, katanya, bisiknya).
- Spasi antar paragraf percakapan.`,
  },
  {
    id: 'pr-03',
    categoryId: 'proofreading',
    title: 'Deteksi Kalimat Bertele-tele (Wordiness & Redundansi)',
    description: 'Pangkas kata-kata mubazir agar naskah lebih padat, ringkas, dan bertenaga.',
    tag: 'Pangkas Mubazir',
    promptText: `Tolong pangkas kata-kata mubazir dan kalimat yang bertele-tele dari teks berikut:
"[PASTE TEKS ANDA]".

Tujuan: Membuat naskah lebih efisien, hemat kata, namun maknanya tetap utuh dan lebih kuat. Berikan perbandingan jumlah kata sebelum dan sesudah dipangkas.`,
  },
  {
    id: 'pr-04',
    categoryId: 'proofreading',
    title: 'Pemeriksaan Konsistensi Sudut Pandang (POV Check)',
    description: "Pastikan kata ganti orang ('aku', 'ia', 'kami') tidak tertukar di tengah jalan.",
    tag: 'Cek Konsistensi POV',
    promptText: `Tolong periksa apakah ada pergeseran sudut pandang narator yang tidak sengaja (POV slip) pada teks berikut:
"[PASTE TEKS LENGKAP ANDA]".

Beri tahu saya jika ada bagian di mana narator orang pertama tiba-tiba mengetahui isi pikiran orang lain tanpa penjelasan logis.`,
  },
  {
    id: 'pr-05',
    categoryId: 'proofreading',
    title: 'Audit Akhir Kesiapan Setor Naskah',
    description: 'Pemeriksaan kelayakan menyeluruh sebelum naskah dikirim ke kurator antologi.',
    tag: 'Final Audit',
    promptText: `Saya akan menyetorkan naskah ini ke kurasi buku antologi.
Berikut naskah lengkap saya:
"[PASTE NASKAH LENGKAP]".

Berikan audit ringkas mengenai:
- Kerapian ejaan dan alinea.
- Kejelasan alur dari awal hingga akhir.
- Tiga kekuatan terbesar naskah ini.
- Satu hal kecil yang masih bisa ditingkatkan sebelum setor.`,
  },

  // 16. PERBAIKI GAYA BAHASA (5 Prompts)
  {
    id: 'gb-01',
    categoryId: 'perbaiki-gaya-bahasa',
    title: 'Menghaluskan Transisi Antar Paragraf',
    description: 'Perbaiki paragraf yang terasa melompat secara kasar.',
    tag: 'Transisi Mengalir',
    promptText: `Perpindahan dari Paragraf 1 ke Paragraf 2 ini terasa kaku dan melompat:
Paragraf 1: "[PASTE PARAGRAF 1]"
Paragraf 2: "[PASTE PARAGRAF 2]"

Tolong perbaiki kalimat terakhir paragraf 1 dan kalimat pertama paragraf 2 agar transisinya mengalir dengan lembut secara logis maupun emosional.`,
  },
  {
    id: 'gb-02',
    categoryId: 'perbaiki-gaya-bahasa',
    title: 'Ubah Kalimat Pasif Menjadi Aktif',
    description: 'Tingkatkan energi tulisan dengan berfokus pada pelaku aksi.',
    tag: 'Kalimat Aktif',
    promptText: `Teks ini terasa lambat karena terlalu banyak menggunakan struktur pasif:
"[PASTE TEKS ANDA]".

Tolong revisi teks tersebut menjadi kalimat-kalimat aktif yang lebih bertenaga. Pastikan subjeknya jelas melakukan tindakan. Tunjukkan versi perbaikannya.`,
  },
  {
    id: 'gb-03',
    categoryId: 'perbaiki-gaya-bahasa',
    title: 'Koreksi Pengulangan Kata (Eksplorasi Sinonim)',
    description: 'Atasi masalah repetisi kata yang sama dalam jarak berdekatan.',
    tag: 'Repetisi Kata',
    promptText: `Dalam paragraf ini, saya merasa terlalu banyak mengulang kata "[MASUKKAN KATA YANG DIULANG]":
"[PASTE PARAGRAF ANDA]".

Tolong perbaiki paragraf ini dengan memanfaatkan sinonim yang bervariasi atau mengubah struktur kalimat, sehingga pengulangan kata tersebut hilang tanpa merusak makna aslinya.`,
  },
  {
    id: 'gb-04',
    categoryId: 'perbaiki-gaya-bahasa',
    title: 'Bermain dengan "Rule of Three"',
    description: 'Gunakan struktur tiga pilar untuk memberi penekanan puitis.',
    tag: 'Rule of Three',
    promptText: `Saya ingin memberikan penekanan dramatis pada gagasan ini menggunakan teknik "Rule of Three" (tiga frasa atau kata sifat yang berurutan).
Ide saya: "[JELASKAN IDE SEDERHANA, misal: Rumah itu hancur karena perang]".

Berikan 5 variasi kalimat yang menerapkan "Rule of Three" untuk mengamplifikasi dampak emosional gagasan tersebut.`,
  },
  {
    id: 'gb-05',
    categoryId: 'perbaiki-gaya-bahasa',
    title: 'Sesuaikan dengan Target Pembaca',
    description: 'Ubah gaya bahasa sesuai usia atau latar belakang pembaca.',
    tag: 'Penyesuaian Tone',
    promptText: `Saya telah menulis teks ini:
"[PASTE TEKS ANDA]".

Tolong tulis ulang teks ini untuk menargetkan pembaca "[MASUKKAN TARGET PEMBACA: misal: Remaja Gen Z / Dewasa muda yang mencari ketenangan hidup]".
Sesuaikan pilihan diksi, panjang kalimat, dan nada (tone) agar relevan dengan demografi tersebut.`,
  },

  // 17. BUAT SINOPSIS (5 Prompts)
  {
    id: 'bsn-01',
    categoryId: 'buat-sinopsis',
    title: 'Sinopsis Singkat 1 Halaman untuk Editor',
    description: 'Buat ringkasan cerita dari A sampai Z secara jelas dan tanpa rahasia.',
    tag: 'Sinopsis Redaksi',
    promptText: `Bertindaklah sebagai editor naskah. Saya perlu membuat sinopsis lengkap cerita saya (mengungkapkan ending) sepanjang maksimal 500 kata.

Berikut informasi ceritanya:
- Tokoh Utama: [NAMA & DESKRIPSI SINGKAT]
- Konflik/Inciting Incident: [KONFLIK AWAL]
- Perjalanan/Rintangan: [PERJALANAN SINGKAT]
- Ending: [PENYELESAIAN]

Tolong tuliskan sinopsis yang lugas, profesional, dan menonjolkan kekuatan emosi serta perubahan karakter dari awal hingga akhir.`,
  },
  {
    id: 'bsn-02',
    categoryId: 'buat-sinopsis',
    title: 'Logline (Premis Satu Kalimat Penjual)',
    description: 'Rangkum cerita dalam satu kalimat emas yang memikat penerbit.',
    tag: 'Logline',
    promptText: `Berdasarkan ringkasan cerita saya berikut:
"[PASTE RINGKASAN CERITA]".

Tolong rumuskan 5 alternatif "Logline" (Premis Penjual 1 Kalimat) yang memuat elemen: Tokoh Utama + Tujuan + Rintangan Hebat + Taruhan (Stakes). Logline harus langsung membuat orang penasaran.`,
  },
  {
    id: 'bsn-03',
    categoryId: 'buat-sinopsis',
    title: 'Sinopsis Emosional (Fokus Perjalanan Batin)',
    description: 'Tulis sinopsis yang menyoroti pergulatan psikologis karakter.',
    tag: 'Sinopsis Batin',
    promptText: `Naskah saya sangat fokus pada konflik batin.
Ringkasan cerita: "[PASTE RINGKASAN CERITA]".

Tolong tuliskan sinopsis 3 paragraf. Paragraf 1 tentang luka awal tokoh. Paragraf 2 tentang ujian terberat yang memaksa dia menghadapinya. Paragraf 3 tentang bagaimana tokoh akhirnya berdamai (atau tidak) dengan lukanya. Hindari terlalu banyak detail plot fisik, fokus pada perjalanan jiwa.`,
  },
  {
    id: 'bsn-04',
    categoryId: 'buat-sinopsis',
    title: 'Merampingkan Sinopsis yang Terlalu Panjang',
    description: 'Pangkas sinopsis 3 halaman menjadi 1 halaman yang padat.',
    tag: 'Pangkas Sinopsis',
    promptText: `Sinopsis saya ini terlalu panjang dan bertele-tele karena memuat terlalu banyak detail minor:
"[PASTE SINOPSIS PANJANG ANDA]".

Tolong pangkas dan tata ulang menjadi sinopsis ringkas yang padat (maksimal 400 kata). Pertahankan hanya alur utama (A-Story) dan buang semua sub-plot atau karakter pendukung yang tidak esensial.`,
  },
  {
    id: 'bsn-05',
    categoryId: 'buat-sinopsis',
    title: 'Pitching Cerita Pendek (Elevator Pitch)',
    description: 'Buat paragraf pendek (pitch) untuk meyakinkan pembaca dalam 30 detik.',
    tag: 'Elevator Pitch',
    promptText: `Saya punya waktu 30 detik (atau 1 paragraf pendek) untuk menjelaskan naskah saya kepada seseorang yang sibuk agar mereka tertarik membaca.
Konsep saya: "[JELASKAN KONSEP]".

Buatkan "Elevator Pitch" yang sangat memikat, berani, dan menonjolkan apa yang membuat cerita ini sangat berbeda atau penting untuk dibaca saat ini.`,
  },

  // 18. BUAT BLURB (5 Prompts)
  {
    id: 'bb-01',
    categoryId: 'buat-blurb',
    title: 'Blurb Belakang Buku Misterius & Penasaran',
    description: 'Tulis teks pemasaran yang berhenti di tengah ketegangan cerita.',
    tag: 'Blurb Menarik',
    promptText: `Saya membutuhkan Blurb (teks pemasaran di sampul belakang buku) untuk memancing pembaca membeli buku.
Cerita saya tentang: "[JELASKAN RINGKASAN CERITA]".

Buatkan 3 alternatif Blurb (masing-masing 3-4 kalimat). Mulai dengan hook empati tokoh, sebutkan masalah utama yang menimpanya, lalu AKHIRI dengan pertanyaan menggantung (cliffhanger) yang membuat pembaca penasaran. JANGAN membocorkan ending.`,
  },
  {
    id: 'bb-02',
    categoryId: 'buat-blurb',
    title: 'Blurb Puitis untuk Naskah Sastra / Memori',
    description: 'Gunakan nada sastrawi untuk buku bergenre perenungan batin.',
    tag: 'Blurb Puitis',
    promptText: `Buku antologi ini berisi kisah-kisah perenungan batin dan memori masa lalu.
Tema besar buku: "[MASUKKAN TEMA]".

Tolong buatkan draf Blurb yang puitis, melankolis, namun menghangatkan hati. Gunakan gaya bahasa majas yang mengundang pembaca untuk merangkul kerentanan dan menyembuhkan luka mereka bersama buku ini.`,
  },
  {
    id: 'bb-03',
    categoryId: 'buat-blurb',
    title: 'Memoles Blurb yang Terlalu Mirip Sinopsis',
    description: 'Ubah blurb yang kaku menjadi teks iklan buku (copywriting) yang emosional.',
    tag: 'Polish Blurb',
    promptText: `Blurb yang saya buat ini terasa kaku karena terlalu merangkum jalan cerita, bukan menjual emosinya:
"[PASTE BLURB KAKU ANDA]".

Tolong revisi teks ini menjadi *Marketing Copy* yang berfokus pada pengalaman emosional apa yang akan dirasakan pembaca (misal: rasa kehilangan, ketegangan, penyembuhan) daripada menceritakan langkah-langkah plotnya.`,
  },
  {
    id: 'bb-04',
    categoryId: 'buat-blurb',
    title: 'Blurb Berformat Kutipan + Deskripsi Singkat',
    description: 'Gunakan kutipan dialog/naskah sebagai pembuka blurb.',
    tag: 'Quote Blurb',
    promptText: `Saya ingin blurb buku dimulai dengan kutipan kuat dari dalam naskah: "[MASUKKAN KUTIPAN]".

Berdasarkan kutipan tersebut dan tema cerita "[MASUKKAN TEMA]", tolong buatkan paragraf blurb lanjutan yang melengkapi kekuatan kutipan itu. Susun menjadi satu kesatuan teks belakang sampul yang estetik.`,
  },
  {
    id: 'bb-05',
    categoryId: 'buat-blurb',
    title: 'Blurb Kompilasi Cerpen (Antologi Bersama)',
    description: 'Buat blurb yang mewakili keberagaman cerita 10+ penulis dalam satu buku.',
    tag: 'Blurb Antologi',
    promptText: `Buku ini adalah kumpulan 15 naskah cerita dari 15 penulis yang berbeda, semua disatukan oleh satu benang merah tema: "[MASUKKAN TEMA ANTOLOGI, misal: Keberanian melepaskan masa lalu]".

Tolong buatkan blurb payung (umbrella blurb) yang merepresentasikan keragaman kisah di dalamnya (ada yang sedih, marah, menerima) namun pada akhirnya akan membawa pembaca pada satu tujuan katarsis yang sama.`,
  },

  // 19. CAPTION PROMOSI (5 Prompts) - Preserved existing
  {
    id: 'cp-01',
    categoryId: 'caption-promosi',
    title: 'Caption Storytelling Teaser Peluncuran Buku Antologi',
    description: 'Ajak pembaca penasaran dengan cerita di balik proses penulisan naskahmu.',
    tag: 'Storytelling Teaser',
    promptText: `Bertindaklah sebagai copywriter sastra untuk media sosial (Instagram/Threads/TikTok).
Naskah saya dalam buku antologi berjudul: "[JUDUL NASKAH]".
Inti cerita naskah: "[JELASKAN INTI KISAH]".
Buku antologi ini diterbitkan oleh: "Ranah Menulis".

Tolong buatkan 2 opsi caption storytelling yang menyentuh hati:
- Struktur: Hook pembuka yang relatable -> Kisah singkat di balik penulisan -> Call to Action lembut untuk ikut menyambut kelahiran buku ini.
- Gunakan nada bahasa yang hangat, bersahaja, dan estetis. Sertakan hashtag yang relevan.`,
  },
  {
    id: 'cp-02',
    categoryId: 'caption-promosi',
    title: 'Caption Kutipan Terbaik (Quote Reveal Post)',
    description: 'Format caption estetik yang mengiringi gambar kutipan naskahmu.',
    tag: 'Quote Post',
    promptText: `Berikut adalah kutipan terbaik dari bab naskah saya di buku antologi:
"[MASUKKAN KUTIPAN KUNCI]".

Bantu saya membuat caption Instagram yang menguraikan makna di balik kutipan tersebut dalam 3–4 paragraf pendek yang reflektif, diakhiri dengan ajakan membaca cerita lengkapnya di buku antologi terbaru Ranah Menulis.`,
  },
  {
    id: 'cp-03',
    categoryId: 'caption-promosi',
    title: 'Caption Pembukaan Pre-Order (Pre-Order Launch)',
    description: 'Promosikan masa pemesanan buku antologi dengan ajakan yang elegan.',
    tag: 'Pre-Order Promo',
    promptText: `Buku antologi bersama Ranah Menulis yang memuat tulisan saya akhirnya resmi membuka sesi Pre-Order!
Judul Naskah Saya: "[JUDUL NASKAH]"
Judul Buku Antologi: "[JUDUL BUKU]"
Benefit / Periode PO: "[MASUKKAN DETAIL PO / TANGGAL]"

Tolong buatkan caption promosi yang elegan, tidak terkesan hard-selling, namun membuat teman dan pembaca merasa ingin memiliki buku ini di rak mereka.`,
  },
  {
    id: 'cp-04',
    categoryId: 'caption-promosi',
    title: 'Carousel Copywriting: 5 Pelajaran dari Naskah Saya',
    description: 'Susun teks slide demi slide untuk postingan edukatif/reflektif Instagram carousel.',
    tag: 'Carousel Slides',
    promptText: `Saya ingin membuat postingan Instagram Carousel (5–7 slide) berdasarkan tema naskah saya: "[MASUKKAN TEMA CERITA]".

Tolong buatkan susunan teks per slide:
- Slide 1: Cover Hook yang memikat.
- Slide 2–5: 4 Pelajaran hidup atau renungan batin utama dari cerita.
- Slide 6: Cuplikan satu paragraf dari buku.
- Slide 7: Penutup & ajakan memiliki buku antologi.`,
  },
  {
    id: 'cp-05',
    categoryId: 'caption-promosi',
    title: 'Caption Apresiasi & Perjalanan Menulis Antologi',
    description: 'Ungkapkan rasa syukur atas rampungnya naskah setelah berproses di Ranah Menulis.',
    tag: 'Apresiasi & Refleksi',
    promptText: `Saya ingin membagikan postingan rasa syukur dan refleksi tentang bagaimana rasanya menyelesaikan naskah antologi ini dari yang awalnya ragu hingga akhirnya siap terbit bersama penulis-penulis hebat lainnya di Ranah Menulis.

Tolong buatkan caption hangat dan personal yang menginspirasi teman-teman lain untuk berani menuliskan cerita mereka sendiri.`,
  },
];

export const AI_PROMPT_CATEGORIES = promptCategories;
export const AI_PROMPT_ITEMS = prompts;
export const aiPrompts = prompts;
