import type { OverlayDirection, RatioKey } from "../types";

export interface PresetTemplate {
  id: string;
  name: string;
  category: string;
  tag: string;
  description: string;
  ratio: RatioKey;
  thumbnailGradient: string;
  title: string;
  subtitle: string;
  credit: string;
  titleStyle: {
    fontFamily: string;
    fontSize: number;
    fontWeight: number;
    color: string;
    align: "left" | "center" | "right";
  };
  subtitleStyle: {
    fontFamily: string;
    fontSize: number;
    fontWeight: number;
    color: string;
    align: "left" | "center" | "right";
  };
  creditStyle: {
    fontFamily: string;
    fontSize: number;
    fontWeight: number;
    color: string;
    align: "left" | "center" | "right";
  };
  overlay: {
    enabled: boolean;
    color: string;
    alpha: number;
    direction: OverlayDirection;
    coverPct: number;
  };
}

export const PRESET_TEMPLATES: PresetTemplate[] = [
  {
    id: "breaking-news",
    name: "ব্রেকিং নিউজ ফটোকার্ড",
    category: "News & Media",
    tag: "Trending",
    description: "সংবাদ এবং জরুরী খবরের জন্য ডার্ক রেড গ্র্যাডিয়েন্ট লুক",
    ratio: "1:1",
    thumbnailGradient: "from-red-950 via-slate-900 to-black",
    title: "জাতীয় প্রেস ক্লাবে গুরুত্বপুর্ণ সাংবাদিক সম্মেলন অনুষ্ঠিত",
    subtitle: "ব্রেকিং নিউজ | ঢাকা",
    credit: "ইনফোকার্ড নিউজ ডিজিটাল • ডেসপ্যাচ",
    titleStyle: {
      fontFamily: "Purno",
      fontSize: 42,
      fontWeight: 800,
      color: "#ffffff",
      align: "left",
    },
    subtitleStyle: {
      fontFamily: "Purno",
      fontSize: 24,
      fontWeight: 700,
      color: "#ef4444",
      align: "left",
    },
    creditStyle: {
      fontFamily: "Purno",
      fontSize: 20,
      fontWeight: 600,
      color: "#cbd5e1",
      align: "left",
    },
    overlay: {
      enabled: true,
      color: "#000000",
      alpha: 0.65,
      direction: "gradient-bottom",
      coverPct: 55,
    },
  },
  {
    id: "minimal-quote",
    name: "মিনিমাল ইনস্পায়ারিং কোট",
    category: "Quotes & Thoughts",
    tag: "Popular",
    description: "লাইফ কোটস এবং মোটিভেশনাল বাণীর জন্য এলিগ্যান্ট ডার্ক থিম",
    ratio: "1:1",
    thumbnailGradient: "from-zinc-900 via-stone-900 to-black",
    title: "“সাফল্য মানে ব্যর্থতা থেকে শেখা এবং নতুন উদ্যমে শুরু করা।”",
    subtitle: "অনুপ্রেরণামূলক উক্তি",
    credit: "মাইন্ডসেট কোটস বাংলা",
    titleStyle: {
      fontFamily: "Purno",
      fontSize: 38,
      fontWeight: 600,
      color: "#ffffff",
      align: "center",
    },
    subtitleStyle: {
      fontFamily: "Purno",
      fontSize: 22,
      fontWeight: 500,
      color: "#e2e8f0",
      align: "center",
    },
    creditStyle: {
      fontFamily: "Purno",
      fontSize: 18,
      fontWeight: 600,
      color: "#94a3b8",
      align: "center",
    },
    overlay: {
      enabled: true,
      color: "#0f172a",
      alpha: 0.75,
      direction: "vignette",
      coverPct: 60,
    },
  },
  {
    id: "neon-sports",
    name: "স্পোর্টস & ম্যাচ কার্ড",
    category: "Sports & Gaming",
    tag: "High Energy",
    description: "খেলাধুলার আপডেট এবং ম্যাচ রেজাল্টের ইমপ্যাক্টফুল ডিজাইন",
    ratio: "1:1",
    thumbnailGradient: "from-blue-950 via-indigo-950 to-slate-950",
    title: "বাংলাদেশ দলের দুর্দান্ত জয়ে সিরিজ সমতা!",
    subtitle: "ম্যাচ রেজাল্ট | টি-২০ সিরিজ",
    credit: "স্পোর্টস আপডেট বাংলাদেশ",
    titleStyle: {
      fontFamily: "Purno",
      fontSize: 44,
      fontWeight: 800,
      color: "#38bdf8",
      align: "left",
    },
    subtitleStyle: {
      fontFamily: "Purno",
      fontSize: 26,
      fontWeight: 700,
      color: "#facc15",
      align: "left",
    },
    creditStyle: {
      fontFamily: "Purno",
      fontSize: 20,
      fontWeight: 600,
      color: "#e2e8f0",
      align: "left",
    },
    overlay: {
      enabled: true,
      color: "#030712",
      alpha: 0.7,
      direction: "gradient-both",
      coverPct: 50,
    },
  },
  {
    id: "emerald-islamic",
    name: "এমেরাল্ড ইসলামিক বাণী",
    category: "Islamic & Spiritual",
    tag: "Peaceful",
    description: "ইসলামিক আয়াত, হাদিস ও আধ্যাত্মিক বাণীর জন্য শান্ত রয়াল থিম",
    ratio: "1:1",
    thumbnailGradient: "from-emerald-950 via-teal-950 to-black",
    title: "“নিশ্চয়ই কষ্টের সাথেই রয়েছে স্বস্তি।”",
    subtitle: "সূরা আল-ইনশিরাহ • আয়াত ৫-৬",
    credit: "ইসলামিক রিমাইন্ডার বাংলা",
    titleStyle: {
      fontFamily: "Purno",
      fontSize: 40,
      fontWeight: 700,
      color: "#fef08a",
      align: "center",
    },
    subtitleStyle: {
      fontFamily: "Purno",
      fontSize: 24,
      fontWeight: 600,
      color: "#6ee7b7",
      align: "center",
    },
    creditStyle: {
      fontFamily: "Purno",
      fontSize: 18,
      fontWeight: 500,
      color: "#d1fae5",
      align: "center",
    },
    overlay: {
      enabled: true,
      color: "#064e3b",
      alpha: 0.65,
      direction: "gradient-both",
      coverPct: 45,
    },
  },
  {
    id: "business-tech",
    name: "বিজনেস & স্টার্টআপ এনাউন্সমেন্ট",
    category: "Business & Tech",
    tag: "Corporate",
    description: "প্রোডাক্ট লঞ্চ, এনাউন্সমেন্ট ও স্টার্টআপ খবরের প্রিমিয়াম লুক",
    ratio: "16:9",
    thumbnailGradient: "from-violet-950 via-purple-950 to-slate-950",
    title: "আমাদের নতুন এআই ফটোকার্ড স্টুডিও এখন লাইভ!",
    subtitle: "প্রোডাক্ট লঞ্চ এনাউন্সমেন্ট",
    credit: "ইনফোকার্ড টেকনোলজিস ল্যাব",
    titleStyle: {
      fontFamily: "Purno",
      fontSize: 46,
      fontWeight: 800,
      color: "#ffffff",
      align: "left",
    },
    subtitleStyle: {
      fontFamily: "Purno",
      fontSize: 26,
      fontWeight: 700,
      color: "#c084fc",
      align: "left",
    },
    creditStyle: {
      fontFamily: "Purno",
      fontSize: 20,
      fontWeight: 600,
      color: "#e9d5ff",
      align: "left",
    },
    overlay: {
      enabled: true,
      color: "#2e1065",
      alpha: 0.6,
      direction: "gradient-bottom",
      coverPct: 50,
    },
  },
];
