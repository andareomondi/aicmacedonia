
# AIC Macedonia Web App

A modern web application built for AIC Macedonia to manage and display church events, media, choirs, and other important announcements. The app is built with [Next.js](https://nextjs.org/) and [Supabase](https://supabase.com/), and deployed on [Vercel](https://vercel.com).

🌍 Live Site: [aicmacedonia.vercel.app](https://aicmacedonia.vercel.app)

---

## ✨ Features

- 🗓️ **Events Management**  
  Display upcoming and featured church events with dynamic updates.

- 🎶 **Choir & Ministry Showcases**  
  Highlight choir groups, their photos, and their contributions.

- 🧑‍💻 **Admin Dashboard**  
  Private admin portal for managing content securely (RLS protected).

- 📸 **Media Uploads**  
  Integration with Supabase storage for media assets (images/videos).

- 🔐 **Authentication**  
  Uses Supabase Auth to ensure secure access for admins and contributors.

- 📱 **Responsive Design**  
  Fully mobile-friendly and optimized for performance.

---

## 🚀 Tech Stack

| Layer       | Tech                        |
|-------------|-----------------------------|
| Frontend    | Next.js (App Router)        |
| Backend     | Supabase (PostgreSQL, Auth, Storage) |
| Styling     | Tailwind CSS, shadcn/ui     |
| Deployment  | Vercel                      |

---

## 📦 Installation (Local Development)

```bash
# Clone the repository
git clone https://github.com/andareomondi/aicmacedonia.git
cd aicmacedonia

# Install dependencies
pnpm install  # or npm install or yarn

# Add environment variables
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

