import { type  Registry } from 'shadcn/schema';

import { components } from './components/_registry';
import { ui } from './ui/_registry';

export const registry = {
  name: "kentkalaw-portfolio-v3",
  homepage: "https://kentkalaw.vercel.app/",
  items: [
    ...components,
    ...ui,
  ],
} satisfies Registry;