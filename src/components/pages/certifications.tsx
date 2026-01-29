"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ShieldCheck, ExternalLink } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"

export default function Certifications() {
  const certifications = [
    {
      title: "CompTIA IT Fundamentals (ITF+)",
      company: "CompTIA",
      year: "2025",
      link: "https://www.credly.com/badges/4af20cea-6765-42ca-9342-7ede0cfe594c/public_url",
    },
    {
      title: "AWS - Cloud Foundations",
      company: "Amazon Web Services (AWS)",
      year: "2024",
      link: "https://www.credly.com/badges/41fdd82e-d354-4e07-9d0c-dcca466b520b/public_url",
    },
    {
      title: "Cisco - Cybersecurity Essentials",
      company: "Cisco Networking Academy",
      year: "2024",
      link: "https://www.netacad.com/certificates/?issuanceId=4cca30ff-2a82-40b7-9a9b-549d63f0903b",
    },
  ]

  const [showAll, setShowAll] = useState(false)
  const extraRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState("0px")

  useEffect(() => {
    if (extraRef.current) {
      setHeight(showAll ? `${extraRef.current.scrollHeight}px` : "0px")
    }
  }, [showAll])

  const mainCerts = certifications.slice(0, 2)
  const extraCerts = certifications.slice(2)

  const CertificationRow = ({ title, company, year, link }: { title: string; company: string; year: string; link: string }) => (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3 transition hover:bg-muted group"
    >
      <div>
        <p className="font-sans text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground">{company}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">{year}</span>
        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  )

  return (
    <section className="mb-3 animate-fade-in animate-delay-500">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="font-mono flex items-center gap-2 text-base md:text-xl font-bold">
            <ShieldCheck />
            Certifications
          </CardTitle>

          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs text-muted-foreground hover:underline"
          >
            {showAll ? "Show Less" : "View All >"}
          </button>
        </CardHeader>

        <CardContent className="space-y-3">
          {mainCerts.map((cert, i) => (
            <CertificationRow key={i} {...cert} />
          ))}

          <div
            ref={extraRef}
            style={{ maxHeight: height }}
            className="overflow-hidden transition-all duration-500 ease-in-out space-y-3"
          >
            {extraCerts.map((cert, i) => (
              <CertificationRow key={i} {...cert} />
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
