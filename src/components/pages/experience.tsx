import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Building2 } from "lucide-react";
interface ExperienceItemProps {
    title: string
    skill: string
    year: string
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
]

export default function Experience() {
    return (
        <section className="mb-3">
        <Card className="">
            <CardHeader>
                <CardTitle className=" font-mono flex items-center gap-2 text-base md:text-xl font-bold">
                    <Building2 />
                    Experience</CardTitle>
            </CardHeader>
            <CardContent>
                {experiences.map((exp, idx) => (
                    <div key={idx} className="relative pl-8 not-last:pb-9">
                        <div className="absolute left-0 top-2.5 h-full w-[2px] bg-muted group-first:h-[calc(100%-24px)] group-first:top-6">
                            <div
        className={`absolute h-3 w-3 -left-[5px] top-0 rounded-full border-2 border-primary 
          ${idx === 0 ? "bg-black" : "bg-background group-hover:bg-black transition-colors duration-300"}`}
      />
                        </div>

                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="block font-sans text-sm font-semibold">{exp.skill}</span>
                    <h3 className="text-sm font-medium">{exp.title}</h3>
                  </div>


                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs transition-colors duration-200">
                    {exp.year}
                  </span>
                </div>
              </div>
            
         
              ))}
            </CardContent>
        </Card>
        </section>
    )
}
