# 📸 Photocard Studio (ফটোকার্ড স্টুডিও)

**সোশ্যাল মিডিয়া ফটোকার্ড ও ক্যারোজেল স্লাইড জেনারেটর** — ব্রেকিং নিউজ, ইসলামিক হাদিছ, অনুপ্রেরণামূলক উক্তি, স্পোর্টস আপডেট এবং সোশ্যাল মিডিয়া পোস্টের জন্য প্রিমিয়াম স্লাইড তৈরি করার একটি আধুনিক ও শক্তিশালী ব্রাউজার-বেসড অ্যাপ্লিকেশন।

---

## ✨ প্রধান সুবিধাসমূহ (Features)

- **ডিফল্ট বাংলা ফন্ট поддержка (Purno Font)**: প্রজেক্টে বিল্ট-ইন ফন্ট হিসেবে স্থানীয় **পুর্ন (Purno)** ফন্ট যুক্ত করা আছে। এর পাশাপাশি **হিন্দ শিলিগুড়ি**, **আনেক বাংলা**, **তিরো বাংলা**, **নোতো শেরিফ** এবং **নোতো সান্স বাংলা** সাপোর্ট করে।
- **কাস্টম ফন্ট আপলোড**: আপনার পছন্দের যেকোনো `.ttf`, `.otf`, অথবা `.woff` ফন্ট ফাইল সরাসরি ব্রাউজারে আপলোড করে ব্যবহার করতে পারবেন।
- **ব্যাচ স্লাইড জেনারেটর (Batch Slide Generator)**: এক ক্লিকে একাধিক টাইটেল ও সাবটাইটেল ইনপুট দিয়ে ১০+ স্লাইড একসাথে জেনারেট করার সুবিধা।
- **ফটোকার্ড টেমপ্লেট গ্যালারি**: বিভিন্ন ক্যাটাগরির (ব্রেকিং নিউজ, ইসলামিক বাণী, মোটিভেশনাল কোটস, স্পোর্টস ও বিজনেস) রেডিমেড প্রিমিয়াম টেমপ্লেট।
- **মাল্টি-আর্টবোর্ড রেশিও**: ৪টি স্ট্যান্ডার্ড ফ্রেম সাইজ — `1:1` (স্কয়ার), `3:4` (পোর্ট্রেট), `16:9` (ওয়াইড), এবং `1:2` (টল)।
- **ইন্টারেক্টিভ ক্যানভাস**: ক্যানভাসে ড্র্যাগ ও রিসাইজ ড্রপ করে টাইটেল, সাবটাইটেল, ক্রেডিট এবং লোগো পজিশনিং।
- **মাল্টি-সিলেক্ট ও অ্যালাইনমেন্ট**: Ctrl/Cmd চেপে একাধিক এলিমেন্ট সিলেক্ট করে আর্টবোর্ড অনুযায়ী অ্যালাইন (বামে/মাঝে/ডানে, ওপরে/মাঝে/নিচে) করা।
- **লোগো ক্রপিং**: লোগো আপলোডের পর ক্রপ করে ক্যানভাসে বসানোর সুবিধা।
- **এইচডি পিএনজি ও জিপ ডাউনলোড**: সম্পূর্ণ স্লাইড সেট এক ক্লিকে হাই-রেজোলিউশন PNG অথবা একটি ZIP ফাইলে ডাউনলোড করুন।
- **অটো-সেভ প্রোগ্রেস**: আপনার প্রজেক্ট ও এডিটগুলো ব্রাউজারের LocalStorage-এ স্বয়ংক্রিয়ভাবে সেভ থাকে।
- **দ্বিভাষিক ইন্টারফেস (i18n)**: বাংলা এবং ইংরেজি ভাষায় ব্যবহারের সুবিধা।

---

## 🛠️ টেকনোলজি স্ট্যাক (Tech Stack)

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript & React 19
- **Styling**: Tailwind CSS v4 + Vanilla CSS Variables (Dark & Light Theme)
- **State Management**: Zustand
- **Fonts**: Local Purno Font + @fontsource (Hind Siliguri, Anek Bangla, Tiro Bangla, Noto Serif, Noto Sans, Manrope, Space Grotesk, Poppins)
- **Export Engine**: `html-to-image` + `jszip` + `file-saver`
- **Internationalization**: `i18next` + `react-i18next`

---

## 🚀 লোকাল ডেভেলপমেন্ট (Local Setup)

প্রজেক্টটি আপনার লোকাল মেশিনে চালানোর জন্য নিচের ধাপগুলো অনুসরন করুন:

```bash
# ক্লােন করুন
git clone https://github.com/AbdullahAlMaksud/photocard-studio.git

# প্রজেক্ট ডিরেক্টরিতে যান
cd photocard-studio

# ডিপেন্ডেন্সি ইনস্টল করুন
npm install

# ডেভেলপমেন্ট সার্ভার চালু করুন
npm run dev
```

সার্ভার চালু হলে ব্রাউজারে [http://localhost:3000](http://localhost:3000) ওপেন করুন।

---

## 📦 প্রডাকশন বিল্ড (Production Build)

```bash
# অ্যাপ বিল্ড করুন
npm run build

# প্রডাকশন সার্ভার চালু করুন
npm run start
```

---

## 📂 ফোল্ডার গঠন (Project Structure)

```
src/
├── app/                      # Next.js App Router (Layouts & Global CSS)
├── components/
│   ├── ui/                   # Shared UI Components (Button, Select, Slider, etc.)
│   └── photocard/            # Core Studio Components
│       ├── controls/         # Inspector & Settings Panels (Text, Overlay, Presets)
│       ├── templates/        # Preset Templates Definition
│       ├── views/            # Main Page Views (Editor, Landing, My Work, Templates)
│       ├── defaults.ts       # Canvas & Style Defaults
│       ├── export.ts         # High-res Canvas Capture & ZIP Export
│       ├── font-loader.ts    # Custom Font Registration
│       ├── store.ts          # Zustand Global Store & LocalStorage Sync
│       └── types.ts          # TypeScript Definitions & Built-in Fonts list
└── lib/                      # Utilities & i18n configuration
public/
└── fonts/                    # Local Custom Fonts (Purno Regular, Bold, Italic)
```

---

## 👤 লেখক (Author)

**Abdullah Al Maksud**
- GitHub: [@AbdullahAlMaksud](https://github.com/AbdullahAlMaksud)
