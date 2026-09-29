# 🔗 Knot — URL Shortener

Knot is a modern and simple URL shortener built with **Next.js, Tailwind CSS, and Supabase**.

It allows users to create short, shareable URLs, manage their links from a dashboard, create custom aliases, and track link clicks.

## ✨ Features

- 🔗 Create short URLs from long URLs
- ⚡ Generate unique short codes automatically
- ✏️ Create custom aliases
- 📊 Track link clicks
- 📋 Manage all shortened URLs from a dashboard
- 🗑️ Delete shortened URLs
- 🔐 User authentication
- 🔑 Forgot password and password reset
- 🛡️ Protected dashboard routes
- 📱 Responsive design
- 🚀 Fast and lightweight
- ☁️ Supabase database and authentication
- 🌐 Deployable on Vercel

## 🛠️ Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend & Database
- Supabase
- Supabase Authentication
- PostgreSQL
- Next.js API Routes

### Deployment
- Vercel

## 📁 Project Structure

```text
knot/
├── app/
│   ├── api/
│   │   └── urls/
│   ├── dashboard/
│   ├── login/
│   ├── signup/
│   ├── forgot-password/
│   ├── reset-password/
│   └── [shortCode]/
│
├── components/
├── lib/
│   └── supabase/
│
├── public/
├── .env.local
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
