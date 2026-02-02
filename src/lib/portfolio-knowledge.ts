// Portfolio Knowledge Base for RAG
// This file contains all the content from Kent Kalaw's portfolio website

import { blogPosts } from "./blog-data";

export const portfolioKnowledge = {
  personalInfo: {
    name: "Kent Francis E. Kalaw",
    shortName: "Kent Kalaw",
    location: "Batangas City, Philippines",
    title: "Software Developer / Full-stack Developer",
    email: "kentfranciskalaw@gmail.com",
    status: "Fresh Graduate, Open to new opportunities and collaborations",
    hobbies: [
      "Coding",
        "Learning new technologies",
        "Currently exploring AI integration",
        "Gaming especially FPS Games like Valorant",
    ],
  },

  about: `Kent Kalaw is a Fresh Graduate Full-stack Software Developer with a passion in building web and mobile applications using modern technologies. He works on projects including building scalable digital solutions and integrating RESTful APIs. He's passionate about learning new technologies and sharing knowledge with the developer community. Currently exploring AI integration and modern development workflows.`,

  experience: [
    {
      role: "Freelance Web Developer",
      company: "Freelance",
      period: "2025 - Present",
      description: "Working as an independent web developer on various projects",
    },
    {
      role: "Frontend Developer - Intern",
      company: "University of Batangas - ICT Department",
      period: "2025",
      description: "Internship focusing on frontend development",
    },
    {
      role: "BS Information Technology",
      company: "University of Batangas",
      period: "2021 - 2025",
      description: "Bachelor's degree in Information Technology",
    },
  ],

  techStack: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "React",
    "Node.js",
    "PHP",
    "Next.js",
    "Bootstrap",
    "Tailwind CSS",
    "MySQL",
    "Laravel",
    "PostgreSQL",
    "Supabase",
  ],

  projects: [
    {
      title: "IQAO - Auditing System",
      description: "A comprehensive auditing system for University of Batangas",
      url: "https://www.iqao.ub.edu.ph/",
      status: "Live",
    },
    {
      title: "AI Resume Builder",
      description: "AI-powered resume builder application",
      url: "https://ai-resume-builder-pi-navy.vercel.app",
      status: "Live",
    },
    {
      title: "Pixelria",
      description: "A Pixel Sketching App for creating pixel art",
      url: "https://pixelria.vercel.app/",
      status: "Live",
    },
    {
      title: "Koyam's Recette",
      description: "A Recipe App for Filipino Dishes",
      url: null,
      status: "Not available for public viewing",
    },
  ],

  certifications: [
    {
      title: "CompTIA IT Fundamentals (ITF+)",
      issuer: "CompTIA",
      year: "2025",
      credlyUrl: "https://www.credly.com/badges/4af20cea-6765-42ca-9342-7ede0cfe594c/public_url",
    },
    {
      title: "AWS - Cloud Foundations",
      issuer: "Amazon Web Services (AWS)",
      year: "2024",
      credlyUrl: "https://www.credly.com/badges/41fdd82e-d354-4e07-9d0c-dcca466b520b/public_url",
    },
    {
      title: "Cisco - Cybersecurity Essentials",
      issuer: "Cisco Networking Academy",
      year: "2024",
      credlyUrl: "https://drive.google.com/file/d/1Y8-oDKbw9wapXuNLKapowOBovVQZ8oI8/view?usp=sharing",
    },
  ],

  socials: {
    github: "https://github.com/kentkalaw",
    linkedin: "https://linkedin.com/in/kentkalaw",
    facebook: "https://facebook.com/kentkalaw03",
    email: "mailto:kentfranciskalaw@gmail.com",
  },

  websiteInfo: {
    description: "Kent Kalaw's personal portfolio website showcasing his work, skills, and projects.",
    sections: ["About", "Blog", "Tech Stack", "Certifications", "Experience", "GitHub Contributions", "Socials", "Projects", "Contact Form"],
    features: ["Dark/Light mode toggle", "Responsive design", "Contact form with email integration", "AI Chatbot assistant"],
  },
};

// Generate context string for the AI
export function generatePortfolioContext(): string {
  const k = portfolioKnowledge;
  
  return `
## Kent Kalaw's Portfolio Information

### Personal Information
- **Full Name:** ${k.personalInfo.name}
- **Location:** ${k.personalInfo.location}
- **Role:** ${k.personalInfo.title}
- **Email:** ${k.personalInfo.email}
- **Status:** ${k.personalInfo.status}

### About Kent
${k.about}

### Hobbies
${k.personalInfo.hobbies.join(', ')}

### Work Experience
${k.experience.map(exp => `- **${exp.role}** at ${exp.company} (${exp.period})`).join('\n')}

### Technical Skills
Kent is proficient in: ${k.techStack.join(', ')}

### Projects
${k.projects.map(proj => `- **${proj.title}:** ${proj.description}${proj.url ? ` - [${proj.url}]` : ' (Not publicly available)'}`).join('\n')}

### Certifications
${k.certifications.map(cert => `- **${cert.title}** from ${cert.issuer} (${cert.year})`).join('\n')}

### Blog Posts
Kent writes blog posts about his journey and experiences. Here are the current posts:
${blogPosts.map(post => `- **${post.title || 'Untitled'}** (${post.timestamp}): ${post.content.substring(0, 150).replace(/\n/g, ' ')}...`).join('\n')}

To read the full blog posts, visitors can go to the /blogs page or click on individual posts.

### Social Links
- GitHub: ${k.socials.github}
- LinkedIn: ${k.socials.linkedin}
- Facebook: ${k.socials.facebook}
- Email: ${k.socials.email}

### Website Features
This portfolio includes: ${k.websiteInfo.sections.join(', ')}
Special features: ${k.websiteInfo.features.join(', ')}
`;
}
