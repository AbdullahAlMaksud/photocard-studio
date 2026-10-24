# Photocard Studio — Design Once, Generate Many

**Short Description:** A browser-based photocard and carousel slide generator for social media, featuring Bangla typography, batch slide creation, customizable templates, and high-resolution PNG export.

[![pnpm](https://img.shields.io/badge/pnpm-10+-4a4a55?style=for-the-badge&logo=pnpm&logoColor=f69220)](https://pnpm.io/)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<p align="center">
  <img width="49%" alt="Photocard Studio screenshot 1" src="https://github.com/user-attachments/assets/1c0b7b36-3b55-459e-9463-3ab208922cc7" />
  <img width="49%" alt="Photocard Studio screenshot 2" src="https://github.com/user-attachments/assets/922fffe8-fd0c-4445-902d-364cad97e137" />
</p>

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About

Photocard Studio is an all-in-one, browser-based design and export application built for content creators, news publishers, Islamic page administrators, and social media managers. It simplifies the creation of visually consistent photocards and multi-slide carousel sets without requiring heavyweight desktop software.

With live previews, customizable typography, reusable templates, and batch export capabilities, Photocard Studio provides an efficient workflow for creating social media graphics directly in the browser.

## Features

- **High-Resolution PNG Export:** Export designs as high-resolution PNG images directly in the browser without server-side processing.
- **Batch Slide Generation:** Create 10 or more carousel cards simultaneously with a one-click workflow.
- **Customizable Templates:** Start with curated templates for Breaking News, Islamic Quotes, Motivational Thoughts, and Sports.
- **Multiple Artboard Ratios:** Design for 1:1 (Square), 3:4 (Portrait), 16:9 (Wide), and 1:2 (Tall) formats.
- **Batch ZIP Export:** Download multiple generated slides together in a ZIP archive.
- **Bilingual Interface:** Switch between English and Bengali, with support for both dark and light themes.
- **Automatic Workspace Recovery:** Save workspace data in browser LocalStorage and recover projects across sessions.

### Typography & Customization

- **Bengali Font Support:** Use Purno, Hind Siliguri, Anek Bangla, Tiro Bangla, and Noto fonts.
- **Custom Font Uploads:** Upload and use custom `.ttf`, `.otf`, and `.woff` fonts directly in the browser.
- **Brand Logo Cropper:** Crop logos into circle, square, or freeform shapes.
- **Alignment Toolbar:** Arrange and align multiple design elements for consistent layouts.

### Templates & Canvas Formats

- Use curated templates for different social media content categories.
- Choose from four artboard aspect ratios to suit different publishing needs.
- Generate consistent multi-slide carousel designs with batch creation tools.

### Export & Workflow

- Export individual designs as high-resolution PNG files.
- Export multiple slides in a ZIP archive.
- Create and manage designs using browser-based tools without server-side image processing.
- Recover saved workspace data using LocalStorage.

## Tech Stack

- **Package Manager:** [pnpm](https://pnpm.io/)
- **Framework:** [Next.js 16](https://nextjs.org/) — App Router and Turbopack
- **Language:** [TypeScript](https://www.typescriptlang.org/) and React 19
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) and Radix UI primitives
- **State Management:** Zustand with LocalStorage persistence
- **Image Export:** [html-to-image](https://github.com/bubkoo/html-to-image)
- **Batch Export:** [JSZip](https://stuk.github.io/jszip/) and [file-saver](https://github.com/eligrey/FileSaver.js)
- **Internationalization:** [i18next](https://www.i18next.com/) and [react-i18next](https://react.i18next.com/)

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js 20.9 or later](https://nodejs.org/)
- [pnpm 10 or later](https://pnpm.io/installation)

Install pnpm globally if needed:

```bash
npm install -g pnpm
```

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/AbdullahAlMaksud/photocard-studio.git
cd photocard-studio
```

**2. Install dependencies**

```bash
pnpm install
```

**3. Configure environment variables (Optional)**

Create a `.env.local` file in the project root and configure the required variables using `.env.example` as your reference, if your local setup requires it.

See [Environment Variables](#environment-variables) for details.

**4. Start the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Photocard Studio uses environment variables to configure application services and external integrations.

1. Create a `.env.local` file in the project root.
2. Review `.env.example` for available variables and their intended use.
3. Configure the required settings for MongoDB Atlas and GitHub API integration, as applicable.
4. Keep credentials and access tokens private.

Never commit your real `.env.local` file or expose private credentials in client-side code.

### Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server. |
| `pnpm build` | Create a production build. |
| `pnpm start` | Run the production build. |
| `pnpm lint` | Run the linter. |

### Project Structure

```text
.
├── src/
│   ├── app/                 # Routes and pages (Next.js App Router)
│   ├── components/          # Reusable UI components and studio modules
│   ├── lib/                 # Utilities, helpers, and i18n configuration
│   └── types/               # Shared TypeScript types
├── public/                  # Static assets and custom fonts
├── .env.example             # Environment variable reference
├── pnpm-lock.yaml           # pnpm lockfile
├── pnpm-workspace.yaml      # pnpm workspace and build configuration
└── README.md
```

### Deployment

Photocard Studio can be deployed to [Vercel](https://vercel.com/) or another hosting platform that supports Next.js.

Before deploying, configure the environment variables required by your chosen storage integrations and ensure that the database and GitHub API settings are correct.

To build and run the production application:

```bash
pnpm build
pnpm start
```

For platform-specific instructions, consult the [Next.js deployment documentation](https://nextjs.org/docs/app/getting-started/deploying).

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your feature"
   ```

4. Push the branch:

   ```bash
   git push origin feature/your-feature
   ```

5. Open a pull request.

For larger changes, please open an issue first to discuss the proposed improvements.

## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for details.

## Contact

**Abdullah Al Maksud**

Email: [maksud.workspace@gmail.com](mailto:maksud.workspace@gmail.com)

Website: [abdullahalmaksud.com](https://abdullahalmaksud.com)

LinkedIn: [@AbdullahAlMaksud](https://linkedin.com/in/AbdullahAlMaksud)

GitHub: [@AbdullahAlMaksud](https://github.com/AbdullahAlMaksud)

Project Repository: [photocard-studio](https://github.com/AbdullahAlMaksud/photocard-studio)
