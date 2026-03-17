<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</p>
# ⚒️ APIForge

> **Design, version, and test mock APIs — before your backend is ready.**

APIForge is a modern mock API management platform that lets frontend and backend teams build, configure, and validate API endpoints in a beautiful dark-themed dashboard. Think **Postman + Supabase Dashboard**, purpose-built for mock infrastructure.

## ✨ Features

| Feature | Description |
|---|---|
| 🔧 **API Builder** | Create mock APIs with name, version, description, and auth type |
| 📡 **Endpoint Editor** | Define endpoints with method, path, status code, response body, and simulated delay |
| 🧪 **Built-in Test Console** | Fire requests with custom headers and body — see responses instantly |
| 🔐 **Auth Simulation** | Test API Key and JWT authentication flows before backend is complete |
| 📖 **Auto-Generated Docs** | Each API gets a documentation page with endpoint details |
| ⚙️ **API Settings** | Manage versioning, auth configuration, and danger zone operations |
| 📊 **Dashboard Overview** | At-a-glance stats: total APIs, active APIs, endpoints, and draft count |
| 🎨 **Premium Dark UI** | Glassmorphism cards, gradient accents, and smooth Framer Motion animations |

---

## 🛠️ Tech Stack

- **Framework** — [Next.js 16](https://nextjs.org/) (App Router + Turbopack)
- **Language** — [TypeScript 5.9](https://www.typescriptlang.org/)
- **Styling** — [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Animations** — [Framer Motion](https://www.framer.com/motion/)
- **Icons** — [Lucide React](https://lucide.dev/)
- **State** — Zustand-style React Context store
- **HTTP Client** — [Axios](https://axios-http.com/)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn** or **pnpm**

### Installation

```bash
# Clone the repo
git clone https://github.com/anjali-0404/ApiForge.git
cd ApiForge

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📂 Project Structure

```
ApiForge/
├── app/
│   ├── api/[id]/           # API detail, docs & settings pages
│   ├── auth/               # Auth management page
│   ├── console/            # Global API testing console
│   ├── create-api/         # Create new mock API
│   ├── dashboard/          # Dashboard overview
│   ├── docs/               # Documentation hub
│   ├── settings/           # Profile settings
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles & design tokens
├── components/
│   ├── ApiCard.tsx          # API card for dashboard grid
│   ├── ApiTester.tsx        # Built-in API testing console
│   ├── EndpointModal.tsx    # Add/edit endpoint modal
│   ├── EndpointTable.tsx    # Endpoint listing table
│   ├── JsonEditor.tsx       # JSON response body editor
│   ├── Navbar.tsx           # Top navigation bar
│   ├── Sidebar.tsx          # Dashboard sidebar navigation
│   └── Tabs.tsx             # Tab switcher component
├── layout/
│   └── DashboardLayout.tsx  # Dashboard wrapper layout
├── lib/
│   ├── api-store.tsx        # Global API state management
│   ├── axios.ts             # Axios instance config
│   ├── helpers.ts           # Utility functions
│   ├── types.ts             # TypeScript type definitions
│   └── utils.js             # Tailwind merge utility
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 📸 Pages

| Page | Route | Description |
|---|---|---|
| Landing | `/` | Hero section with feature highlights |
| Dashboard | `/dashboard` | API overview with stats and search |
| Create API | `/create-api` | Form to create a new mock API |
| API Detail | `/api/[id]` | Endpoints, docs, settings, auth tabs |
| Console | `/console` | Global API testing console |
| Auth | `/auth` | Authentication key management |
| Docs | `/docs` | Documentation hub |
| Settings | `/settings` | Profile and account settings |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repo
2. Create your branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).


