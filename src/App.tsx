import { useState } from 'react'
import { Sidebar, defaultNavItems } from './components/Sidebar'
import { FilterBar } from './components/FilterBar'
import { Breadcrumb } from './components/Breadcrumb'
import { SituationOverview } from './components/SituationOverview'
import { ExecutiveSummary } from './components/ExecutiveSummary'
import { CommsActionsSection } from './components/CommsActionsSection'
import { KPISection } from './components/KPISection'
import { DistributionAndInfluenceRow } from './components/DistributionAndInfluenceRow'
import { TrendsMovementSection } from './components/TrendsMovementSection'
import { IssuesNarrativesSection } from './components/IssuesNarrativesSection'
import { ChannelPerformanceSection } from './components/ChannelPerformanceSection'
import { Facebook, Instagram, Music2 } from 'lucide-react'
import { tokens } from './tokens'

// ─── Demo data ────────────────────────────────────────────────────────────────

const demoReputationHealth = {
  score: 55,
  maxScore: 100,
  previousScore: 70,
  onViewDrivers: () => console.log('View Drivers clicked'),
}

const demoRiskLevel = {
  riskLevel: 'MEDIUM' as const,
  description: 'Moderate risk: Notable negative sentiment detected.',
  negativeSentimentPct: 24.5,
  totalMentions: 1129,
  thresholds: [
    'Negative share of total mentions',
    'Volume volatility (daily spikes)',
  ],
  period: { from: '2016-04-24', to: '2026-04-22' },
}

const demoActors = {
  subtitle: 'Most mentioned actors in recent coverage',
  actors: [
    {
      name: 'BGN',
      type: 'Media' as const,
      count: 28,
      sentiment: 'Netral' as const,
      positive: 1, neutral: 24, negative: 3,
    },
    {
      name: 'Prabowo Subianto',
      type: 'Media' as const,
      count: 21,
      sentiment: 'Netral' as const,
      positive: 4, neutral: 14, negative: 3,
    },
    {
      name: 'Badan Gizi Nasional RI (@badangizinasional.ri)',
      type: 'Media Sosial' as const,
      count: 18,
      sentiment: 'Positif' as const,
      positive: 18, neutral: 0, negative: 0,
    },
    {
      name: 'MBG',
      type: 'Media' as const,
      count: 14,
      sentiment: 'Netral' as const,
      positive: 1, neutral: 10, negative: 3,
    },
  ],
}

// ─── Demo KPI data ────────────────────────────────────────────────────────────

const demoKPI = {
  totalMentions: {
    value: '1.1K',
    onClick: () => console.log('Total Mentions clicked'),
  },
  estimatedReach: {
    value: '1.1M',
    postCount: 1129,
    engaged: { likes: 4820, shares: 1230, replies: 376 },
  },
  shareOfVoice: {
    sharePercent: 5.9,
    topMedia: [
      { name: 'detik',       percent: 5.9 },
      { name: 'kumparan',    percent: 4.2 },
      { name: 'antaranews',  percent: 3.8 },
    ],
    onClick: () => console.log('Share of Voice clicked'),
  },
  topIssue: {
    issue: 'MBG',
    mentions: 344,
    onClick: () => console.log('Top Issue clicked'),
  },
  topRegion: {
    region: 'N/A',
    sublabel: 'Insufficient regional data',
  },
}

// ─── Demo Distribution & Influence data ──────────────────────────────────────

const demoDistributionAndInfluence = {
  mediaInfluence: {
    sentimentByTab: {
      total:  { positif: 138, netral: 714, negatif: 277 },
      media:  { positif: 82,  netral: 401, negatif: 170 },
      social: { positif: 56,  netral: 313, negatif: 107 },
    },
  },
  dataDistribution: {
    total: 1129,
    totalLabel: 'Total Mention',
    categories: [
      {
        label: 'Media',
        icon: 'newspaper' as const,
        value: 653,
        subItems: [
          { label: 'Tier 1', value: 359 },
          { label: 'Tier 2', value: 192 },
          { label: 'Tier 3', value: 0 },
        ],
      },
      {
        label: 'Media Sosial',
        icon: 'chat' as const,
        value: 476,
        subItems: [
          { label: 'Instagram', value: 207 },
          { label: 'YouTube', value: 104 },
          { label: 'TikTok', value: 97 },
          { label: 'Facebook', value: 15 },
        ],
      },
    ],
  },
}

// ─── Demo Channel Performance data ───────────────────────────────────────────

const demoChannelPerformance = {
  platforms: [
    {
      id: 'facebook' as const,
      label: 'Facebook',
      icon: <Facebook size={15} />,
      accounts: [
        {
          name: 'Badan Gizi Nasional',
          handle: 'p',
          likes: 4300,
          replies: 1000,
          shares: 305,
          sentiment: { positive: 16, neutral: 63, negative: 21 },
          topPost: {
            text: 'Dukungan nutrisi bukan sekedar urusan perut, tapi soal perhatian khususnya bagi anak-anak difable yang bersekolah di sekolah luar biasa. Program MBG hadir untuk memastikan...',
            likes: 3200,
            replies: 352,
            url: '#',
          },
        },
        {
          name: 'BGN Official',
          handle: 'bgn.official',
          likes: 12100,
          replies: 2300,
          shares: 145,
          sentiment: { positive: 72, neutral: 20, negative: 8 },
          topPost: {
            text: 'Program MBG terus berjalan untuk memastikan anak-anak Indonesia mendapatkan nutrisi terbaik setiap harinya...',
            likes: 4100,
            replies: 890,
            url: '#',
          },
        },
        {
          name: 'Gizi Indonesia',
          handle: 'giziindonesia',
          likes: 8400,
          replies: 1100,
          shares: 98,
          sentiment: { positive: 85, neutral: 12, negative: 3 },
          topPost: {
            text: 'Hari ini kami berbagi informasi penting tentang kandungan gizi dalam menu MBG yang telah distandarisasi secara nasional...',
            likes: 2800,
            replies: 430,
            url: '#',
          },
        },
      ],
    },
    {
      id: 'instagram' as const,
      label: 'Instagram',
      icon: <Instagram size={15} />,
      accounts: [
        {
          name: 'Badan Gizi Nasional RI',
          handle: 'badangizinasional.ri',
          likes: 37700,
          replies: 6600,
          shares: 0,
          sentiment: { positive: 97, neutral: 3, negative: 0 },
          topPost: {
            text: 'Akhirnyaaa... ini dia Kawan Gizi!🤩 Jingle baru Badan Gizi Nasional berjudul Nutrisi Emas 2045 resmi diperkenalkan🎵 Yuk dengarkan dan bagikan semangat gizi untuk Indonesia!',
            likes: 7600,
            replies: 2800,
            url: '#',
          },
        },
      ],
    },
    {
      id: 'tiktok' as const,
      label: 'TikTok',
      icon: <Music2 size={15} />,
      accounts: [
        {
          name: 'BGN Official',
          handle: 'bgn.official',
          likes: 12400,
          replies: 890,
          shares: 1540,
          sentiment: { positive: 72, neutral: 21, negative: 7 },
          topPost: {
            text: 'Program Makan Bergizi Gratis menyentuh hati anak-anak Indonesia 🥗 Lihat bagaimana senyum mereka berubah ketika mendapat asupan gizi yang cukup setiap harinya...',
            likes: 4100,
            replies: 312,
            url: '#',
          },
        },
      ],
    },
  ],
}

// ─── Demo Trends & Movement data ─────────────────────────────────────────────

const demoTrends = {
  allScrapedData: [
    { date: '2023-12-17', news: 8,  social: 4  },
    { date: '2023-12-24', news: 12, social: 6  },
    { date: '2023-12-31', news: 6,  social: 3  },
    { date: '2024-01-07', news: 14, social: 8  },
    { date: '2024-01-14', news: 20, social: 12 },
    { date: '2024-01-21', news: 18, social: 10 },
    { date: '2024-01-28', news: 24, social: 16 },
    { date: '2024-02-04', news: 28, social: 18 },
    { date: '2024-02-11', news: 22, social: 14 },
    { date: '2024-02-18', news: 16, social: 10 },
    { date: '2024-02-25', news: 20, social: 12 },
    { date: '2024-03-03', news: 26, social: 17 },
    { date: '2024-03-10', news: 30, social: 20 },
    { date: '2024-03-17', news: 24, social: 15 },
    { date: '2024-03-24', news: 18, social: 11 },
    { date: '2024-03-31', news: 22, social: 13 },
    { date: '2024-04-07', news: 28, social: 18 },
    { date: '2024-04-14', news: 32, social: 22 },
    { date: '2024-04-21', news: 26, social: 16 },
  ],
  coverageData: [
    { date: '2023-12-28', value: 10 },
    { date: '2024-01-07', value: 22 },
    { date: '2024-01-14', value: 35 },
    { date: '2024-01-21', value: 28 },
    { date: '2024-01-28', value: 45 },
    { date: '2024-02-04', value: 55 },
    { date: '2024-02-11', value: 40 },
    { date: '2024-02-18', value: 30 },
    { date: '2024-02-25', value: 38 },
    { date: '2024-03-03', value: 50 },
    { date: '2024-03-10', value: 60 },
    { date: '2024-03-17', value: 48 },
    { date: '2024-03-24', value: 35 },
    { date: '2024-03-31', value: 42 },
    { date: '2024-04-07', value: 52 },
    { date: '2024-04-14', value: 58 },
    { date: '2024-04-21', value: 44 },
  ],
  negativeData: [
    { date: '2023-12-25', value: 2  },
    { date: '2024-01-01', value: 4  },
    { date: '2024-01-08', value: 8  },
    { date: '2024-01-15', value: 6  },
    { date: '2024-01-22', value: 12 },
    { date: '2024-01-29', value: 18 },
    { date: '2024-02-05', value: 14 },
    { date: '2024-02-12', value: 10 },
    { date: '2024-02-19', value: 7  },
    { date: '2024-02-26', value: 9  },
    { date: '2024-03-04', value: 15 },
    { date: '2024-03-11', value: 22 },
    { date: '2024-03-18', value: 16 },
    { date: '2024-03-25', value: 10 },
    { date: '2024-04-01', value: 13 },
    { date: '2024-04-08', value: 20 },
    { date: '2024-04-14', value: 17 },
  ],
  coveragePeriod: '2016-04-24 to 2026-04-22',
  onNegativeSpikeClick: (point: { date: string; value: number }) =>
    console.log('Spike clicked:', point),
}

// ─── Demo Issues & Narratives data ───────────────────────────────────────────

const HEATMAP_ROWS = [
  { issue: 'Makan Bergizi Gratis (MBG)', mentions: 405, pct: '47%', positive: 92,  neutral: 113, negative: 200 },
  { issue: 'Makan Bergizi Gratis',       mentions:  66, pct:  '8%', positive: 19,  neutral:   8, negative:  39 },
  { issue: 'Efisiensi Anggaran',         mentions:  12, pct:  '1%', positive:  0,  neutral:  12, negative:   0 },
  { issue: 'Program Pemerintah',         mentions:   9, pct:  '1%', positive:  1,  neutral:   8, negative:   0 },
  { issue: 'Ramadan',                    mentions:   7, pct:  '1%', positive:  0,  neutral:   7, negative:   0 },
  { issue: 'Ketahanan Pangan',           mentions:   7, pct:  '1%', positive:  1,  neutral:   4, negative:   2 },
  { issue: 'Penghematan Anggaran',       mentions:   6, pct:  '1%', positive:  0,  neutral:   6, negative:   0 },
  { issue: 'Kualitas Menu MBG',          mentions:  18, pct:  '2%', positive:  2,  neutral:   6, negative:  10 },
  { issue: 'Distribusi Program',         mentions:  14, pct:  '2%', positive:  3,  neutral:   8, negative:   3 },
  { issue: 'Dapur MBG',                  mentions:  11, pct:  '1%', positive:  1,  neutral:   5, negative:   5 },
  { issue: 'Motor Listrik MBG',          mentions:   9, pct:  '1%', positive:  0,  neutral:   3, negative:   6 },
  { issue: 'Transparansi Anggaran',      mentions:   8, pct:  '1%', positive:  0,  neutral:   4, negative:   4 },
  { issue: 'Prabowo Subianto',           mentions:  21, pct:  '2%', positive:  4,  neutral:  14, negative:   3 },
  { issue: 'BGN',                        mentions:  28, pct:  '3%', positive:  1,  neutral:  24, negative:   3 },
  { issue: 'Keracunan Makanan',          mentions:   7, pct:  '1%', positive:  0,  neutral:   1, negative:   6 },
  { issue: 'Lele Mentah',                mentions:   5, pct:  '1%', positive:  0,  neutral:   0, negative:   5 },
  { issue: 'SPPG',                       mentions:   6, pct:  '1%', positive:  1,  neutral:   3, negative:   2 },
  { issue: 'Stunting',                   mentions:   4, pct:  '0%', positive:  3,  neutral:   1, negative:   0 },
  { issue: 'Inflasi Pangan',             mentions:   6, pct:  '1%', positive:  0,  neutral:   2, negative:   4 },
  { issue: 'Pengadaan Barang',           mentions:   5, pct:  '1%', positive:  0,  neutral:   2, negative:   3 },
]

const demoIssuesNarratives = {
  heatmap: {
    rowsByTab: {
      all:    HEATMAP_ROWS,
      news:   HEATMAP_ROWS.map((r) => ({ ...r, positive: Math.round(r.positive * 0.6), neutral: Math.round(r.neutral * 0.65), negative: Math.round(r.negative * 0.58) })),
      social: HEATMAP_ROWS.map((r) => ({ ...r, positive: Math.round(r.positive * 0.4), neutral: Math.round(r.neutral * 0.35), negative: Math.round(r.negative * 0.42) })),
    },
    onCellClick: (row: { issue: string }, field: string) => console.log('Heatmap cell:', row.issue, field),
  },
  narratives: {
    cards: [
      {
        title: null,
        sentiment: 'negative' as const,
        description: 'Narasi tentang insiden menu MBG yang tidak sesuai standar (lele mentah, porsi tidak jelas, variasi menu selama Ramadan tidak ada standar). Muncul juga kasus kematian siswa di Bengkulu Utara yang dikaitkan dengan MBG (meski BGN membantah). Publik khawatir tentang pengawasan kualitas secara menyeluruh.',
      },
      {
        title: 'Ketidakjelasan Mekanisme Distribusi & Ketepatan Sasaran',
        sentiment: 'negative' as const,
        description: 'Narasi tentang kurangnya transparansi dalam cara MBG didistribusikan, siapa yang berhak menerima, dan bagaimana verifikasi penerima manfaat dilakukan. Publik mempertanyakan apakah bantuan benar-benar sampai ke anak-anak yang paling membutuhkan atau ada kebocoran di rantai distribusi.',
      },
      {
        title: 'Persepsi Program Sebagai Beban Fiskal Daripada Investasi Sosial',
        sentiment: 'negative' as const,
        description: 'Narasi yang memposisikan MBG sebagai pengeluaran besar (Rp36,6 triliun per Februari 2026) yang perlu dihemat, bukan sebagai investasi dalam pengurangan stunting dan pemberdayaan masyarakat. Diskusi tentang \'efisiensi\' dan \'realokasi anggaran\' membuat program terkesan tidak efisien.',
      },
      {
        title: 'Ketidakpercayaan pada Kapasitas Implementasi Lokal',
        sentiment: 'negative' as const,
        description: 'Meski Kabupaten Bandung dipuji sebagai success story, narasi umum menunjukkan keraguan apakah semua daerah mampu mengimplementasikan MBG dengan standar sama. Pertanyaan tentang kapasitas dapur lokal, tenaga, dan logistik menjadi tema berulang.',
      },
      {
        title: 'Optimalisasi Pengawasan dan Penertiban',
        sentiment: 'positive' as const,
        description: 'Upaya pemerintah memperketat pengawasan distribusi dan standar operasional program MBG mulai menunjukkan hasil positif dengan penertiban dapur yang tidak memenuhi syarat.',
      },
      {
        title: 'Potensi Manfaat Program bagi Gizi Anak',
        sentiment: 'positive' as const,
        description: 'Data awal menunjukkan dampak positif program MBG terhadap tingkat kehadiran siswa dan penurunan angka stunting di wilayah percontohan.',
      },
      {
        title: 'Dampak Ekonomi Positif pada Sektor Lokal',
        sentiment: 'positive' as const,
        description: 'Pengadaan bahan makanan lokal untuk MBG memberikan dampak positif bagi petani dan UMKM di sekitar sekolah penerima program.',
      },
      {
        title: 'Potensi Penyalahgunaan Anggaran dan Markup',
        sentiment: 'negative' as const,
        description: 'Muncul dugaan adanya markup harga dan penyimpangan anggaran dalam pengadaan bahan makanan untuk program MBG.',
      },
      {
        title: 'Kontroversi Pengadaan Motor Listrik',
        sentiment: 'negative' as const,
        description: 'Rencana pengadaan motor listrik sebagai armada distribusi MBG menuai kritik terkait harga yang dianggap tidak wajar dan proses tender yang kurang transparan.',
      },
      {
        title: 'Komitmen Anggaran dan Efisiensi',
        sentiment: 'positive' as const,
        description: 'Pernyataan pemerintah bahwa tidak ada pemangkasan dana MBG dan rencana efisiensi memastikan keberlanjutan program dengan standar kualitas terjaga.',
      },
    ],
    generatedAt: '4/28/2026, 1:15:20 PM',
  },
}

// ─── Demo Exec + Comms data ───────────────────────────────────────────────────

const demoExecAndComms = {
  executiveSummary: {
    summaryText: 'Analisis terhadap topik MBG menunjukkan adanya perdebatan sengit seputar implementasi program, mulai dari kualitas makanan, pengawasan, hingga isu pengadaan barang dan dampaknya terhadap perekonomian. Narasi negatif didominasi oleh kekhawatiran akan kualitas dan keamanan makanan, potensi penyalahgunaan anggaran, serta dampak inflasi. Sementara itu, narasi positif menyoroti potensi manfaat program dan upaya pemerintah dalam mengatasi permasalahan. Kontroversi utama berkisar pada standar menu, pengawasan, dan pengadaan motor listrik.',
  },
  commsActions: {
    data: {
      opportunities: [
        {
          title:    "Kampanye 'MBG Economic Impact Amplification' untuk Business Community dan Policy Makers",
          subtitle: "MBG Menciptakan Dampak Ekonomi Signifikan dengan Perputaran Dana Rp 6 Triliun per Bulan",
          description: "Insight Audiens: Business leaders, farmers, rural communities, dan policy makers adalah receptive audience untuk narasi ekonomi MBG karena mereka melihat program sebagai economic stimulus, bukan sekadar charity. Mereka ingin bukti bahwa program ini menciptakan real economic value dan lapangan kerja. Taktik Amplifikasi: (1) Kolaborasi dengan Kadin dan asosiasi bisnis lainnya untuk amplify narasi tentang dampak ekonomi MBG; (2) Buat 'MBG Economic Impact Study' yang menunjukkan multiplier effect dari program (berapa rupiah yang diinvestasikan menjadi berapa rupiah economic output); (3) Showcase success stories dari SPPG operators dan farmers yang mendapat income dari program; (4) Engage media ekonomi (CNBC, Bisnis Indonesia, Detik Finance) untuk publikasi in-depth stories tentang dampak ekonomi MBG. Format Konten: (1) Infografis tentang 'Rp 6 Triliun Perputaran Dana MBG' dengan breakdown ke berbagai sektor ekonomi; (2) Video testimonial dari SPPG operators dan farmers. Metrik Sukses: Minimal 20 media stories tentang dampak ekonomi MBG dalam 3 bulan.",
        },
        {
          title:    "Kampanye 'MBG Global Leadership' untuk Soft Power dan International Recognition",
          subtitle: "MBG Menjadi Model Program yang Ditiru Negara Lain dan Meningkatkan Reputasi Indonesia",
          description: "Insight Audiens: Nationalist groups, policy makers, educated urban population, dan media massa adalah receptive audience untuk narasi tentang MBG sebagai 'world-class program' yang meningkatkan reputasi Indonesia. Mereka ingin bukti bahwa Indonesia adalah innovator dan leader dalam social programs. Taktik: Koordinasi dengan Kemenlu untuk mempromosikan MBG dalam forum internasional, dokumentasi interest dari negara lain, dan partnership dengan organisasi internasional seperti WFP atau UNICEF untuk validasi program.",
        },
        {
          title:    "Kampanye 'MBG Sustainability Guarantee' untuk Beneficiaries dan Potential Beneficiaries",
          subtitle: "Komitmen Presiden Prabowo untuk Melanjutkan MBG Hingga Tuntas Memberikan Jaminan Sustainability",
          description: "Insight Audiens: Beneficiaries, potential beneficiaries, dan kelompok yang concern tentang sustainability adalah receptive audience untuk narasi tentang komitmen Presiden. Mereka ingin jaminan bahwa program akan berlanjut dan mereka bisa mengandalkan program ini. Taktik: Amplifikasi pernyataan resmi Presiden, publikasi roadmap program jangka panjang, dan engagement langsung dengan komunitas penerima manfaat melalui media lokal.",
        },
      ],
      mitigation: [
        { title: 'Risiko Keracunan Massal dan Reputasi',                 description: 'Insiden keracunan makanan berpotensi viral dan merusak kepercayaan publik secara masif — siapkan protokol respons krisis yang terstandar.' },
        { title: 'Eksposur Dugaan Markup Anggaran',                      description: 'Laporan investigasi tentang penggelembungan harga dapat menjadi krisis komunikasi besar — pantau media dan siapkan klarifikasi berbasis data.' },
        { title: 'Polarisasi Opini di Media Sosial',                     description: 'Narasi negatif yang tersebar luas di media sosial dapat mempengaruhi dukungan publik — perkuat engagement positif secara proaktif.' },
        { title: 'Inflasi Pangan Akibat Program',                        description: 'Lonjakan permintaan tanpa penguatan sisi suplai berpotensi mendorong inflasi pangan yang kontraproduktif bagi program itu sendiri.' },
        { title: 'Risiko Politisasi Program',                            description: 'Program berpotensi dijadikan alat politik menjelang kontestasi — pastikan komunikasi tetap pada dampak nyata dan data terukur.' },
      ],
      recommendation: [
        {
          label: '1 Bulan ke Depan',
          items: [
            { title: 'Rilis Pernyataan Resmi Kualitas MBG',     description: 'Terbitkan pernyataan publik yang menjelaskan standar kualitas MBG, respons terhadap kasus keracunan, dan langkah perbaikan konkret dalam 30 hari ke depan.' },
            { title: 'Aktivasi Media Sosial Positif',           description: 'Luncurkan kampanye konten yang menampilkan testimonial positif dari sekolah penerima MBG untuk mengimbangi narasi negatif yang beredar.' },
            { title: 'Koordinasi dengan Tier-1 Media',          description: 'Jadwalkan briefing eksklusif dengan editor media Tier-1 (detik, kumparan, antara) untuk menyampaikan narasi resmi program MBG.' },
          ],
        },
        {
          label: '3 Bulan ke Depan',
          items: [
            { title: 'Publikasi Laporan Transparansi MBG',                    description: 'Terbitkan laporan kuartalan yang mencakup data distribusi, anggaran, kualitas menu, dan hasil audit lapangan secara terbuka kepada publik.' },
            { title: 'Forum Evaluasi Program dengan Pemangku Kepentingan',    description: 'Selenggarakan forum evaluasi yang melibatkan sekolah, orang tua, LSM, dan media untuk mendapatkan masukan dan meningkatkan kepercayaan.' },
          ],
        },
      ],
      source: 'Laporan AI — 21 Apr 2026, 10.10',
    },
  },
}

// ─── Page header ──────────────────────────────────────────────────────────────
// Resizing: fill width, hug height
// Auto Layout: flex-row, align-center, padding from tokens

function PageHeader() {
  const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
  return (
    <header
      className="w-full flex flex-col"
      style={{
        paddingLeft: tokens.spacing['2xl'],
        paddingRight: tokens.spacing['2xl'],
        paddingTop: tokens.spacing.lg,
        paddingBottom: tokens.spacing.lg,
        backgroundColor: tokens.color.surface.primary,
        borderBottom: `1px solid ${tokens.color.border.secondary}`,
        flexShrink: 0,
        gap: tokens.spacing.xs,
      }}
    >
      <h1
        className="font-bold"
        style={{
          fontSize: tokens.typography.size['heading-xl'],
          lineHeight: tokens.typography.lineHeight.tight,
          color: tokens.color.text.primary,
          fontFamily: FONT,
        }}
      >
        Media Intelligence
      </h1>

      <Breadcrumb
        items={[
          { label: 'Programs', href: '/programs' },
          { label: 'MBG' },
        ]}
      />
    </header>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
// Page shell:
//   Resizing: fill viewport (min-w-[1280px])
//   Auto Layout: flex-row (sidebar | main), h-screen

export default function App() {
  const [activeNavId, setActiveNavId] = useState('dashboard')

  // ── Filter state ─────────────────────────────────────────────────────────────
  const [timeRange,   setTimeRange]   = useState('last30')
  const [topic,       setTopic]       = useState('all')
  const [source,      setSource]      = useState('all')
  const [keyword,     setKeyword]     = useState('keyword')
  const [customFrom,  setCustomFrom]  = useState('')
  const [customTo,    setCustomTo]    = useState('')

  return (
    // Root: flex-row, h-screen, min-width 1280px
    <div
      className="flex flex-row"
      style={{
        minWidth: 1280,
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: tokens.color.surface.secondary,
      }}
    >
      {/* ── Sidebar: fixed width, full height ─────────────────────────── */}
      <Sidebar
        navItems={defaultNavItems}
        activeItemId={activeNavId}
        onNavigate={setActiveNavId}
        currentPageTitle="Dashboard"
        currentPageSubtitle="Media Intelligence"
        onBackToPrograms={() => console.log('Back to Programs')}
      />

      {/* ── Main content area: flex-col, fill remaining width ─────────── */}
      {/* Auto Layout: flex-col, overflow-y-auto (scroll within main, not page) */}
      <div
        className="flex flex-col flex-1 overflow-hidden"
        style={{ minWidth: 0 }}
      >
        {/* Page header: fill width, hug height */}
        <PageHeader />

        {/* Filter bar: fill width, hug height */}
        <FilterBar
          timeRange={timeRange}
          topic={topic}
          source={source}
          keyword={keyword}
          customFrom={customFrom}
          customTo={customTo}
          onTimeRangeChange={setTimeRange}
          onTopicChange={setTopic}
          onSourceChange={setSource}
          onKeywordChange={setKeyword}
          onCustomFromChange={setCustomFrom}
          onCustomToChange={setCustomTo}
          onGenerateNarrative={() => console.log('Generate Narrative')}
          onDownloadDailyBriefPDF={() => console.log('Download Daily Brief PDF')}
          onDownloadMonthlyPDF={() => console.log('Download Monthly PDF')}
          onDownloadMonthlyPPTX={() => console.log('Download Monthly PPTX')}
        />

        {/* Scrollable main content: flex-col, gap/2xl, padding */}
        <main
          className="flex flex-col flex-1 overflow-y-auto"
          style={{
            padding: tokens.spacing['2xl'],
            gap: tokens.spacing['2xl'],
          }}
        >
          <SituationOverview
            reputationHealth={demoReputationHealth}
            riskLevel={demoRiskLevel}
            actors={demoActors}
          />
          <ExecutiveSummary {...demoExecAndComms.executiveSummary} />
          <CommsActionsSection {...demoExecAndComms.commsActions} />
          <KPISection {...demoKPI} />
          <DistributionAndInfluenceRow {...demoDistributionAndInfluence} />
          <TrendsMovementSection {...demoTrends} />
          <IssuesNarrativesSection {...demoIssuesNarratives} />
          <ChannelPerformanceSection {...demoChannelPerformance} />
        </main>
      </div>
    </div>
  )
}
