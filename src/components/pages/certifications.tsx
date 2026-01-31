"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShieldCheck, ExternalLink } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

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
      link: "https://drive.google.com/file/d/1Y8-oDKbw9wapXuNLKapowOBovVQZ8oI8/view?usp=sharing",
    },
  ];

  const [showAll, setShowAll] = useState(false);
  const extraRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (extraRef.current) {
      setHeight(showAll ? `${extraRef.current.scrollHeight}px` : "0px");
    }
  }, [showAll]);

  const mainCerts = certifications.slice(0, 3);
  const extraCerts = certifications.slice(3);

  const CertificationRow = ({
    title,
    company,
    year,
    link,
  }: {
    title: string;
    company: string;
    year: string;
    link: string;
  }) => (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-muted/50 hover:bg-muted group flex items-center justify-between rounded-lg px-4 py-3 transition"
    >
      <div>
        <p className="font-sans text-sm font-semibold">{title}</p>
        <p className="text-muted-foreground text-xs">{company}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-xs">{year}</span>
        <ExternalLink className="text-muted-foreground h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </Link>
  );

  return (
    <section className="animate-fade-in animate-delay-500 mb-3">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 font-mono text-base font-bold md:text-xl">
            <ShieldCheck />
            Certifications
          </CardTitle>

          <button
            onClick={() => setShowAll(!showAll)}
            className="text-muted-foreground text-xs hover:underline"
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
            className="space-y-3 overflow-hidden transition-all duration-500 ease-in-out"
          >
            {extraCerts.map((cert, i) => (
              <CertificationRow key={i} {...cert} />
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
