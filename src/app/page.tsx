import Name from "@/components/pages/name";
import About from "@/components/pages/about";
import GithubContributionsCard from "@/components/pages/github-contribution";
export default function Home() {

  return (
    <main className="relative min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">

      <Name />
      <About />
      <GithubContributionsCard />
        {/* Experience Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Experience</h2>
          <div className="space-y-6">
            <div className="border-l-2 border-blue-600 pl-4">
              <h3 className="text-xl font-semibold">Senior Software Engineer</h3>
              <p className="text-gray-600 dark:text-gray-400">Company Name</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">2023 - Present</p>
            </div>
            <div className="border-l-2 border-gray-300 dark:border-gray-600 pl-4">
              <h3 className="text-xl font-semibold">Full-Stack Developer</h3>
              <p className="text-gray-600 dark:text-gray-400">Previous Company</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">2021 - 2023</p>
            </div>
            <div className="border-l-2 border-gray-300 dark:border-gray-600 pl-4">
              <h3 className="text-xl font-semibold">Software Developer</h3>
              <p className="text-gray-600 dark:text-gray-400">Earlier Company</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">2019 - 2021</p>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Tech Stack</h2>
            <a href="#" className="text-blue-600 hover:underline text-sm">View All</a>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Tailwind CSS'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Backend</h3>
              <div className="flex flex-wrap gap-2">
                {['Node.js', 'Python', 'PHP', 'Laravel', 'PostgreSQL', 'MongoDB'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">DevOps & Cloud</h3>
              <div className="flex flex-wrap gap-2">
                {['AWS', 'Docker', 'Kubernetes', 'GitHub Actions'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recent Projects Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Projects</h2>
            <a href="#" className="text-blue-600 hover:underline text-sm">View All</a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <a key={i} href="#" className="block p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-2">Project Name {i}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Brief description of the project and technologies used</p>
                <span className="text-blue-600 text-sm">project-url.com →</span>
              </a>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Certifications</h2>
            <a href="#" className="text-blue-600 hover:underline text-sm">View All</a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <a key={i} href="#" className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-1">Certification Name {i}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Issuing Organization</p>
              </a>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
                <img 
                  src={`https://placehold.co/300x300?text=Gallery+${i}`} 
                  alt={`Gallery ${i}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Kent Kalaw. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                LinkedIn
              </a>
              <a href="https://github.com" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                GitHub
              </a>
              <a href="https://twitter.com" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

