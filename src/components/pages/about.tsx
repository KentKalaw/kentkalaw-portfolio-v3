import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { BriefcaseBusiness } from 'lucide-react';
export default function About() {
  return (
    <section className="mb-3">
    <Card className="">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base md:text-xl font-bold">
          <BriefcaseBusiness />
          About
          </CardTitle>
      </CardHeader>
      <CardContent className="prose text-sm md:text-sm dark:prose-invert max-w-none">
        <p className="text-gray-900 dark:text-gray-500 mb-4">
          I'm a Fresh Graduate Full-stack Software Developer with a passion in building web and mobile applications using modern technologies.
          I work on projects including building scalable web applications, mobile apps, and creating innovative solutions for businesses.
        </p>
        <p className="text-gray-900 dark:text-gray-500">
          I'm passionate about learning new technologies and sharing knowledge with the developer community. 
          Currently exploring AI integration and modern development workflows.
        </p>
      </CardContent>
    </Card>
  </section>
  )
}
