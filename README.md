## Kent Francis E. Kalaw Portfolio - Software Developer

A modern, minimalistic, and responsive personal portfolio website created using Next.js.

Access through: https://kentkalaw.vercel.app

![Portfolio Preview](public/desktop-preview.png)

## Features

- Built with Next.js 16 and React 19
- Styled with Tailwind CSS and shadcn/ui components
- Dark/Light mode with smooth transitions
- Fully responsive design
- Integrated AI Chatbot (Disabled for the meantime)
- GitHub contributions integration
- Blog section
- Contact form
- Smooth animations and transitions

## File Structure
```
├── public/               # Static assets
├── src/
│ ├── app/                # Next.js app directory
│ │ ├── api/              # API routes
│ │ ├── blogs/            # Blog pages
│ │ ├── projects/         # Projects pages
│ │ ├── certifications/   # Certifications pages
│ │ ├── globals.css       # Global styles
│ │ ├── layout.tsx        # Root layout
│ │ └── page.tsx          # Home page
│ ├── components/         # React components
│ │ ├── pages/            # Page sections
│ │ └── ui/               # UI components (shadcn)
│ └── lib/                # Utility functions and data
├── supabase/             # Supabase schema
├── components.json       # shadcn/ui config
├── next.config.ts        # Next.js config
├── tailwind.config.ts    # Tailwind config
└── tsconfig.json         # TypeScript config
```
