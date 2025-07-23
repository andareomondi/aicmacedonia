# 🏛️ AIC Macedonia Website

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/andareomondis-projects/v0-aic-macedonia-website)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)](https://supabase.com/)

> **Official website for Africa Inland Church (AIC) Macedonia - Connecting our community through faith, fellowship, and service.**

## 🌟 Overview

The AIC Macedonia website is a comprehensive digital platform designed to serve our church community with modern web technologies. Built with Next.js 15 and powered by Supabase, it provides a seamless experience for members and visitors to stay connected with church activities, sermons, events, and community life.

## ✨ Key Features

### 🎵 **Choirs & Music Ministry**
- Dynamic choir pages with individual profiles
- YouTube video integration with automatic title fetching
- Leader contact information and meeting schedules
- Image upload system for choir photos

### 📖 **Sermons & Teaching**
- Comprehensive sermon library with categories
- YouTube video embedding with watch functionality
- Pastor profiles and sermon filtering
- Search functionality by title or pastor

### 📅 **Events & Activities**
- Event management system with RSVP functionality
- Calendar integration and event notifications
- Image galleries for past events
- Real-time event updates

### 👥 **Departments & Ministries**
- CED (Christian Education Department) groups
- Youth, Wazee, Prayer Cell, and other ministries
- Department-specific pages with activities
- Leadership information and contact details

### 🔔 **Notifications & Updates**
- Real-time notification system
- Admin-managed announcements
- Bell notification indicator
- Targeted messaging system

### 👨‍💼 **Admin Dashboard**
- Complete content management system
- User management and role-based access
- CRUD operations for all content types
- Analytics and member statistics

## 🛠️ Technology Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Modern UI components
- **Lucide React** - Beautiful icons

### **Backend & Database**
- **Supabase** - PostgreSQL database and authentication
- **Supabase Storage** - File and image storage
- **Row Level Security** - Data protection

### **Features & Integrations**
- **PWA Support** - Progressive Web App capabilities
- **Responsive Design** - Mobile-first approach
- **Dark/Light Mode** - Theme switching
- **YouTube API** - Video integration
- **Email Templates** - Custom Supabase email designs

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/aic-macedonia-website.git
   cd aic-macedonia-website
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Environment Setup**
   Create a `.env.local` file:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   \`\`\`

4. **Database Setup**
   Run the SQL scripts in the `scripts/` folder:
   \`\`\`bash
   # In Supabase SQL Editor
   # 1. Run create-tables.sql
   # 2. Run add-admin-role.sql
   # 3. Run seed-data.sql
   \`\`\`

5. **Start Development Server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

6. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
aic-macedonia-website/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── choirs/            # Choir pages and dynamic routes
│   ├── sermons/           # Sermon library
│   ├── events/            # Events and activities
│   ├── departments/       # Ministry departments
│   └── auth/              # Authentication pages
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utility functions and configs
├── hooks/                # Custom React hooks
├── scripts/              # Database SQL scripts
├── public/               # Static assets
│   ├── images/           # Church and ministry images
│   ├── icons/            # PWA icons
│   └── sponsors/         # Sponsor logos
└── email-templates/      # Custom email templates
\`\`\`

## 🔐 Authentication & Authorization

### User Roles
- **Admin**: Full access to dashboard and content management
- **Member**: Access to member-only content and features
- **Visitor**: Public content access

### Security Features
- Row Level Security (RLS) policies
- JWT-based authentication
- Role-based access control
- Secure file uploads

## 📱 PWA Features

The website is a Progressive Web App with:
- **Offline Support**: Basic functionality without internet
- **Install Prompt**: Add to home screen capability
- **Push Notifications**: Real-time updates
- **Responsive Design**: Works on all devices

## 🎨 Design System

### Colors
- **Primary**: Blue (#1e40af) - Trust and stability
- **Secondary**: Gold (#fbbf24) - Divine light
- **Accent**: Various ministry-specific colors

### Typography
- **Headings**: Inter font family
- **Body**: System font stack for optimal performance

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
\`\`\`bash
npm run build
npm start
\`\`\`

## 🤝 Contributing

We welcome contributions from our church community! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Test your changes thoroughly

## 📞 Support & Contact

- **Church Office**: +254 XXX XXX XXX
- **Email**: info@aicmacedonia.org
- **Website**: [aicmacedonia.org](https://aicmacedonia.org)
- **Technical Issues**: Create an issue on GitHub

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **AIC Macedonia Leadership** - For vision and guidance
- **Development Team** - For dedication and hard work
- **Church Members** - For feedback and support
- **v0.dev** - For rapid prototyping and development
- **Vercel** - For hosting and deployment
- **Supabase** - For backend infrastructure

---

**Built with ❤️ for the AIC Macedonia community**

*"And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another—and all the more as you see the Day approaching." - Hebrews 10:24-25*
