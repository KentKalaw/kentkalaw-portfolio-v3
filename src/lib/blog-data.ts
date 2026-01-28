export interface BlogPost {
  id: number;
  content: string;
  timestamp: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 2,
    content: "I’m currently learning AI integration and trying to implement an AI chatbot dito sa portfolio ko. \nSo far, basic functionality pa lang ang tapos, tulad ng simple responses at UI integration.\n\n Ongoing pa yung improvements lalo na sa context awareness, better responses, at overall user experience.",
    timestamp: "Jan 28, 2026 · 11:15 PM",

  },
  {
    id: 1,
    content: "Hello! I created this blog para i-share ko sa inyo ang journey ko as a developer.\n\n Here, I'll be posting about anything what comes to my mind, the projects I work on, at kung anong nangyayari sa buhay ko ngayon, and all that stuff. \n\nStay tuned for updates and insights into my world of coding and development!",
    timestamp: "Jan 26, 2026 · 10:59 PM",
    
  },
];
