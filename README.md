# Photocard Studio

> Social media photocard and carousel slide generator built for creating, customizing, and exporting high-resolution cards directly in the browser.

<!-- Optional badges: keep to 2-4 at most -->
![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black.svg)
![React](https://img.shields.io/badge/React-19.2.4-blue.svg)
![pnpm](https://img.shields.io/badge/pnpm-v11-orange.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

![Screenshot](./public/photo-svgrepo-com.svg)

**Live demo:** [photocard-studio.vercel.app](https://photocard-studio.vercel.app)

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

# 3. Create your local environment file
cp .env.example .env

# 4. Start the development server
pnpm dev
```

The app will be available at `http://localhost:3000`.

## Environment Variables

All optional environment variables are listed, with short descriptions, in [`.env.example`](./.env.example).

Copy it to `.env` and fill in your own values before running the project. Never commit your real `.env` file.

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

Deploy to Vercel by importing the repository directly. Vercel automatically detects Next.js and pnpm to build and deploy the application.

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
