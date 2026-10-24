# Photocard Studio - Design Once, Generate Many

A browser-based photocard and carousel slide generator for social media, featuring Bangla font support, batch slide creation, customizable templates, and high-resolution PNG export.

[![pnpm](https://img.shields.io/badge/pnpm-9+-4a4a55?style=for-the-badge&logo=pnpm&logoColor=f69220)](https://pnpm.io/)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)


<p align="center">
  <img width="49%" alt="Photocard Studio screenshot 1" src="https://github.com/user-attachments/assets/1c0b7b36-3b55-459e-9463-3ab208922cc7" />
  <img width="49%" alt="Photocard Studio screenshot 2" src="https://github.com/user-attachments/assets/922fffe8-fd0c-4445-902d-364cad97e137" />
</p>

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About

Photocard Studio is an all-in-one browser-based design and export application tailored for content creators, news publishers, Islamic page administrators, and social media managers. It streamlines the creation of uniform photocards and multi-slide carousel sets without needing heavyweight desktop software. Everything operates directly within the browser, providing instant live previews, rich typography customization, and high-resolution exports with complete data privacy.

## Features

- Client-side high-resolution PNG and ZIP batch export with zero server processing
- One-click batch slide generator to create 10+ carousel cards simultaneously
- Curated preset templates for Breaking News, Islamic Quotes, Motivational Thoughts, and Sports
- Multi-aspect ratio artboard support: 1:1 (Square), 3:4 (Portrait), 16:9 (Wide), and 1:2 (Tall)
- Native Bengali font suite (Purno local font, Hind Siliguri, Anek Bangla, Tiro Bangla, Noto) plus custom font uploader (.ttf, .otf, .woff)
- Interactive brand logo cropper (circle, square, freeform) and multi-element alignment toolbar
- Automatic workspace saving and project recovery backed by browser LocalStorage
- Fully bilingual interface (English and Bengali) with dark and light themes

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript, React 19
- **Styling:** Tailwind CSS v4, Radix UI primitives
- **State Management:** Zustand (with LocalStorage persistence)
- **Export Engine:** html-to-image, JSZip, file-saver
- **Internationalization:** i18next, react-i18next

## Getting Started

### Prerequisites

- Node.js 20 or later
- pnpm 10 or later

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/AbdullahAlMaksud/photocard-studio.git
cd photocard-studio

# 2. Install dependencies
pnpm install

# 3. (Optional) Create your local environment file
cp .env.example .env

# 4. Start the development server
pnpm dev
```

The app will be available at `http://localhost:3000`.

## Environment Variables

All optional environment variables are listed, with short descriptions, in [`.env.example`](./.env.example).

To use them, copy the file to `.env` and fill in your own values. Never commit your real `.env` file.

## Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Run the production build |
| `pnpm lint` | Run the linter |

## Project Structure

```text
.
├── src/
│   ├── app/            # Routes and pages (Next.js App Router)
│   ├── components/     # Reusable UI components and studio modules
│   ├── lib/            # Utilities, helpers, and i18n configuration
│   └── types/          # Shared TypeScript types
├── public/             # Static assets and custom fonts
├── .env.example        # Environment variable reference
├── pnpm-lock.yaml      # pnpm lockfile
├── pnpm-workspace.yaml # pnpm workspace and build configuration
└── README.md
```

## Deployment

The easiest way is Vercel: import the repository and it will detect Next.js and pnpm automatically, with no extra configuration needed.

To self-host on your own server instead:

```bash
pnpm build
pnpm start
```

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a pull request

For larger changes, please open an issue first to discuss what you would like to change.

## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for details.

## Contact

Abdullah Al Maksud - [@AbdullahAlMaksud](https://github.com/AbdullahAlMaksud)

Project link: [https://github.com/AbdullahAlMaksud/photocard-studio](https://github.com/AbdullahAlMaksud/photocard-studio)
