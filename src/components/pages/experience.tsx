import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building2 } from "lucide-react";
interface ExperienceItemProps {
  title: string;
  skill: string;
  year: string;
}

const experiences: ExperienceItemProps[] = [
  {
    skill: "Frontend Developer - Intern",
    title: "University of Batangas - ICT Department",
    year: "2025",
  },
  {
    skill: "BS Information Technology",
    title: "University of Batangas",
    year: "2021",
  },
];

export default function Experience() {
  return (
    <section className="animate-fade-in animate-delay-400 mb-3">
      <Card className="">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono text-base font-bold md:text-xl">
            <Building2 />
            Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative pl-8 not-last:pb-9">
              <div className="bg-muted absolute top-2.5 left-0 h-full w-[2px] group-first:top-6 group-first:h-[calc(100%-24px)]">
                <div
                  className={`border-primary absolute top-0 -left-[5px] h-3 w-3 rounded-full border-2 ${idx === 0 ? "bg-black" : "bg-background transition-colors duration-300 group-hover:bg-black"}`}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="block font-sans text-sm font-semibold">
                    {exp.skill}
                  </span>
                  <h3 className="text-sm font-medium">{exp.title}</h3>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs transition-colors duration-200 dark:bg-gray-800">
                  {exp.year}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
