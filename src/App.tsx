import { useState } from 'react'
import { Sidebar, defaultNavItems } from './components/Sidebar'
import { FilterBar } from './components/FilterBar'
import { SituationOverview } from './components/SituationOverview'
import { KPISection } from './components/KPISection'
import { DistributionAndInfluenceRow } from './components/DistributionAndInfluenceRow'
import { ChannelPerformanceSection } from './components/ChannelPerformanceSection'
import { TrendsMovementSection } from './components/TrendsMovementSection'
import { IssuesNarrativesSection } from './components/IssuesNarrativesSection'
import { EvidenceAndCommsRow } from './components/EvidenceAndCommsRow'
import { ExecutiveSummary } from './components/ExecutiveSummary'
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
      { name: 'Twitter / X', percent: 42.3 },
      { name: 'Online News', percent: 31.1 },
      { name: 'Instagram', percent: 18.7 },
    ],
    onClick: () => console.log('Share of Voice clicked'),
  },
  tier1Mentions: {
    value: 359,
    sublabel: 'High-authority sources',
    onClick: () => console.log('Tier-1 clicked'),
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
  { issue: 'MBG',                            share: 39.7, positive: 83, neutral: 165, negative: 196, total: 444 },
  { issue: 'Makan Bergizi Gratis',           share:  7.4, positive: 18, neutral:  73, negative:   9, total:  84 }, // fixed: 84 not 47
  { issue: 'program_makan_bergizi_gratis',   share:  4.5, positive:  7, neutral:  28, negative:   4, total:  39 },
  { issue: 'makan_bergizi_gratis',           share:  1.6, positive:  1, neutral:  13, negative:   0, total:  14 },
  { issue: 'efisiensi_anggaran',             share:  1.3, positive:  0, neutral:  11, negative:   0, total:  11 },
  { issue: 'program_pemerintah',             share:  0.9, positive:  1, neutral:   7, negative:   0, total:   8 },
  { issue: 'program_mbg',                    share:  0.9, positive:  1, neutral:   7, negative:   0, total:   8 },
]

const demoIssuesNarratives = {
  heatmap: {
    rowsByTab: {
      all:    HEATMAP_ROWS,
      news:   HEATMAP_ROWS.map((r) => ({ ...r, social: undefined, positive: Math.round(r.positive * 0.6), neutral: Math.round(r.neutral * 0.65), negative: Math.round(r.negative * 0.58) })),
      social: HEATMAP_ROWS.map((r) => ({ ...r, positive: Math.round(r.positive * 0.4), neutral: Math.round(r.neutral * 0.35), negative: Math.round(r.negative * 0.42) })),
    },
    onCellClick: (row: { issue: string }, field: string) => console.log('Heatmap cell:', row.issue, field),
  },
  narratives: {
    cards: [
      {
        title: 'Kualitas dan Keamanan Makanan MBG',
        sentiment: 'negative' as const,
        description: 'Berbagai laporan mengungkap kasus keracunan makanan dan standar kebersihan yang tidak memadai dalam pelaksanaan program MBG di sejumlah daerah, menimbulkan kekhawatiran serius tentang pengawasan kualitas.',
      },
      {
        title: 'Potensi Penyalahgunaan Anggaran dan Markup',
        sentiment: 'negative' as const,
        description: 'Muncul dugaan adanya markup harga dan penyimpangan anggaran dalam pengadaan bahan makanan untuk program MBG, memunculkan tuntutan audit menyeluruh dari berbagai pihak.',
      },
      {
        title: 'Dampak Ekonomi dan Inflasi',
        sentiment: 'negative' as const,
        description: 'Program MBG dinilai berpotensi mendorong inflasi pangan lokal akibat lonjakan permintaan yang tidak diimbangi kapasitas produksi domestik yang memadai.',
      },
      {
        title: 'Kontroversi Pengadaan Motor Listrik',
        sentiment: 'negative' as const,
        description: 'Rencana pengadaan motor listrik sebagai armada distribusi MBG menuai kritik terkait harga yang dianggap tidak wajar dan proses tender yang kurang transparan.',
      },
      {
        title: 'Optimalisasi Pengawasan dan Penertiban',
        sentiment: 'positive' as const,
        description: 'Upaya pemerintah memperketat pengawasan distribusi dan standar operasional program MBG mulai menunjukkan hasil positif dengan berkurangnya keluhan di beberapa wilayah.',
      },
      {
        title: 'Potensi Manfaat Program',
        sentiment: 'positive' as const,
        description: 'Data awal menunjukkan dampak positif program MBG terhadap tingkat kehadiran siswa dan penurunan angka stunting di wilayah percontohan.',
      },
      {
        title: 'Komitmen Anggaran dan Efisiensi',
        sentiment: 'positive' as const,
        description: 'Pemerintah menegaskan komitmen anggaran jangka panjang untuk program MBG disertai upaya efisiensi rantai pasok guna memastikan keberlanjutan dan ketepatan sasaran.',
      },
    ],
    generatedAt: '4/9/2026, 11:13:26 PM',
  },
}

// ─── Demo Evidence & Comms data ──────────────────────────────────────────────

const demoEvidenceAndComms = {
  evidence: {
    items: [
      { title: 'MBG: Menjaga Kepercayaan Publik',                                         source: 'media_indonesia',      sourceType: 'NEWS' as const, tier: 'No Tier' as const, sentiment: 'positive' as const, date: '2 Apr 2026'  },
      { title: 'DPR RI: Program MBG berdayakan ekonomi lokal',                            source: 'antara__terkini',      sourceType: 'NEWS' as const, tier: 'Tier 2'  as const, sentiment: 'positive' as const, date: '31 Mar 2026' },
      { title: 'SDN Cipulir 05 Pagi Jaksel terima MBG pascalibur Lebaran',                source: 'antara__terkini',      sourceType: 'NEWS' as const, tier: 'Tier 2'  as const, sentiment: 'positive' as const, date: '31 Mar 2026' },
      { title: 'MBG Jadi 5 Hari dalam Seminggu, Purbaya: Efisien dan Tidak Kurangi Kualitas', source: 'okezone',          sourceType: 'NEWS' as const, tier: 'Tier 2'  as const, sentiment: 'positive' as const, date: '27 Mar 2026' },
      { title: 'BRIN topang kesuksesan Program MBG lewat inovasi dan riset peternakan',   source: 'antara__terkini',      sourceType: 'NEWS' as const, tier: 'Tier 2'  as const, sentiment: 'positive' as const, date: '27 Mar 2026' },
      { title: 'Khatib Salat Id di Istiqlal: Koperasi Merah Putih-MBG Perlu Diapresiasi', source: 'detik',               sourceType: 'NEWS' as const, tier: 'Tier 1'  as const, sentiment: 'positive' as const, date: '21 Mar 2026' },
      { title: 'Video: Mentan Amran Sebut Program MBG Bikin Harga Telur Ayam Stabil',     source: 'cnbc_indonesia__news', sourceType: 'NEWS' as const, tier: 'No Tier' as const, sentiment: 'positive' as const, date: '3 Mar 2026'  },
      { title: 'Lapor Pak Prabowo! Bos Honda Bilang MBG Bikin Penjualan Motor Naik',      source: 'cnbc_indonesia__news', sourceType: 'NEWS' as const, tier: 'No Tier' as const, sentiment: 'positive' as const, date: '26 Feb 2026' },
      { title: 'Ajwa, Medjool, hingga Sukari, Kurma Apa yang Paling Laku di Tanah Abang?', source: 'detik_finance',      sourceType: 'NEWS' as const, tier: 'Tier 1'  as const, sentiment: 'neutral'  as const, date: '25 Feb 2026' },
      { title: 'Mengupas Lingkar Manfaat Program Makan Bergizi Gratis',                   source: 'kumparan.com',         sourceType: 'NEWS' as const, tier: 'Tier 1'  as const, sentiment: 'positive' as const, date: '23 Feb 2026' },
    ],
  },
  commsActions: {
    data: {
      opportunities: [
        { title: 'Inspeksi Mendadak dan Penertiban Dapur MBG',           description: 'Segera lakukan inspeksi mendadak ke semua dapur MBG untuk memastikan kualitas, kebersihan, dan kesesuaian dengan standar gizi yang telah ditetapkan.' },
        { title: 'Edukasi dan Sosialisasi Standar Menu',                 description: 'Berikan panduan yang jelas dan edukasi berkelanjutan kepada pengelola SPPG dan mitra dapur tentang standar menu, kebersihan, dan penanganan bahan makanan.' },
        { title: 'Transparansi Anggaran dan Mekanisme Pengawasan',       description: 'Publikasikan detail anggaran dan mekanisme penyaluran dana secara transparan melalui portal publik untuk memperkuat kepercayaan masyarakat.' },
        { title: 'Penyusunan Standardisasi Menu Nasional',               description: 'Kembangkan standardisasi menu MBG yang mempertimbangkan aspek gizi, keamanan pangan, dan keberagaman pangan lokal di setiap daerah.', highlighted: true },
        { title: 'Evaluasi Dampak Ekonomi Program',                      description: 'Lakukan studi komprehensif mengenai dampak program MBG terhadap harga komoditas pangan dan kondisi petani lokal secara berkala.' },
      ],
      risks: [
        { title: 'Risiko Keracunan Massal dan Reputasi',                 description: 'Insiden keracunan makanan berpotensi viral dan merusak kepercayaan publik secara masif — siapkan protokol respons krisis yang terstandar.' },
        { title: 'Eksposur Dugaan Markup Anggaran',                      description: 'Laporan investigasi tentang penggelembungan harga dapat menjadi krisis komunikasi besar — pantau media dan siapkan klarifikasi berbasis data.' },
        { title: 'Polarisasi Opini di Media Sosial',                     description: 'Narasi negatif yang tersebar luas di media sosial dapat mempengaruhi dukungan publik — perkuat engagement positif secara proaktif.' },
        { title: 'Inflasi Pangan Akibat Program',                        description: 'Lonjakan permintaan tanpa penguatan sisi suplai berpotensi mendorong inflasi pangan yang kontraproduktif bagi program itu sendiri.' },
        { title: 'Risiko Politisasi Program',                            description: 'Program berpotensi dijadikan alat politik menjelang kontestasi — pastikan komunikasi tetap pada dampak nyata dan data terukur.' },
      ],
      checklist: [
        { title: 'Rilis laporan progres mingguan MBG',                   description: 'Terbitkan ringkasan pencapaian minggu ini: jumlah penerima manfaat, dapur aktif, dan insiden yang ditangani.' },
        { title: 'Monitor sentimen media dan media sosial',              description: 'Lakukan pemantauan harian terhadap berita dan percakapan digital seputar MBG untuk deteksi dini isu yang berkembang.' },
        { title: 'Koordinasi dengan KSP dan Kemenko PMK',               description: 'Sinkronisasi pesan dan narasi dengan kantor KSP dan Kemenko PMK untuk konsistensi komunikasi lintas kementerian.' },
        { title: 'Perbarui FAQ dan materi edukasi publik',               description: 'Pastikan halaman FAQ dan konten edukasi di kanal resmi selalu aktual sesuai perkembangan terbaru program.', highlighted: true },
        { title: 'Evaluasi kinerja mitra dapur bermasalah',              description: 'Tinjau dan tindaklanjuti laporan mitra dapur yang mendapat sorotan negatif, lengkap dengan tindakan korektif terukur.' },
      ],
      source: 'Laporan AI — 9 Apr 2026, 23.13',
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
      className="w-full flex flex-row items-center"
      style={{
        paddingLeft: tokens.spacing['2xl'],
        paddingRight: tokens.spacing['2xl'],
        paddingTop: tokens.spacing.lg,
        paddingBottom: tokens.spacing.lg,
        backgroundColor: tokens.color.surface.primary,
        borderBottom: `1px solid ${tokens.color.border.secondary}`,
        flexShrink: 0,
        gap: tokens.spacing.md,
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

      {/* Program badge */}
      <div
        className="flex flex-row items-center"
        style={{ gap: tokens.spacing.xs }}
      >
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['body-sm'],
            color: tokens.color.text.tertiary,
          }}
        >
          Program:
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['label-xs'],
            fontWeight: tokens.typography.weight.semibold,
            color: tokens.color.text.brand,
            backgroundColor: tokens.color.surface.infoSubtle,
            border: `1px solid ${tokens.color.border.info}`,
            borderRadius: tokens.radius.full,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 3,
            paddingBottom: 3,
            letterSpacing: '0.04em',
          }}
        >
          MBG
        </span>
      </div>
    </header>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
// Page shell:
//   Resizing: fill viewport (min-w-[1280px])
//   Auto Layout: flex-row (sidebar | main), h-screen

export default function App() {
  const [activeNavId, setActiveNavId] = useState('dashboard')

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
          timeRange="All Time"
          topic="All Topics"
          source="All Sources"
          keyword="Keyword"
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
          <ExecutiveSummary summaryText="Analisis terhadap topik MBG menunjukkan adanya perdebatan sengit seputar implementasi program, mulai dari kualitas makanan, pengawasan, hingga isu pengadaan barang dan dampaknya terhadap perekonomian. Narasi negatif didominasi oleh kekhawatiran akan kualitas dan keamanan makanan, potensi penyalahgunaan anggaran, serta dampak inflasi. Sementara itu, narasi positif menyoroti potensi manfaat program dan upaya pemerintah dalam mengatasi permasalahan. Kontroversi utama berkisar pada standar menu, pengawasan, dan pengadaan motor listrik." />
          <KPISection {...demoKPI} />
          <DistributionAndInfluenceRow {...demoDistributionAndInfluence} />
          <ChannelPerformanceSection {...demoChannelPerformance} />
          <TrendsMovementSection {...demoTrends} />
          <IssuesNarrativesSection {...demoIssuesNarratives} />
          <EvidenceAndCommsRow {...demoEvidenceAndComms} />
        </main>
      </div>
    </div>
  )
}
