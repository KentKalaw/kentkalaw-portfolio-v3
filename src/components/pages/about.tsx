import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BriefcaseBusiness } from "lucide-react";
export default function About() {
  return (
    <section className="animate-fade-in animate-delay-100 mb-3">
      <Card className="">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono text-base font-bold md:text-xl">
            <BriefcaseBusiness />
            About
          </CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none text-sm md:text-sm">
          <p className="mb-2 text-gray-900 dark:text-gray-300 text-justify">
            I'm a Fresh Graduate Full-stack Software Developer with a passion in
            building web and mobile applications using modern technologies. I
            work on projects including building scalable digital solutions and
            integrating RESTful APIs.
          </p>
          <p className="mb-2 text-gray-900 dark:text-gray-300 text-justify">
            I'm passionate about learning new technologies and sharing knowledge
            with the developer community. Currently exploring AI integration and
            modern development workflows.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
