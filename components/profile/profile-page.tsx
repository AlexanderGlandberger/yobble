"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { Clock3, FileText, MapPin, Upload } from "lucide-react";
import { mockApplications, mockProfile } from "@/lib/mock-profile";

const applicationTabs = ["Sparad", "Ansökt", "Intervju"] as const;
type ApplicationTab = (typeof applicationTabs)[number];

export function ProfilePage() {
  const [coverLetter, setCoverLetter] = useState(mockProfile.coverLetterDraft);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [activeApplicationTab, setActiveApplicationTab] = useState<ApplicationTab>("Ansökt");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const filteredApplications = mockApplications.filter(
    (application) => application.status === activeApplicationTab
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 h-28 w-28 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-600 p-1">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-white text-3xl font-bold text-rose-500">
              {mockProfile.name[0]}
            </div>
          </div>

          <h2 className="text-3xl font-semibold text-slate-900">{mockProfile.name}</h2>
          <p className="mt-1 text-[24px] text-slate-600">{mockProfile.title}</p>

          <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <MapPin className="h-4 w-4" /> {mockProfile.location}
          </p>

          <p className="mt-4 max-w-md text-sm leading-7 text-slate-700">{mockProfile.bio}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {mockProfile.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <div className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="flex items-center gap-2 text-2xl font-semibold text-slate-900">
                <Upload className="h-5 w-5" /> Ladda upp CV
              </h3>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 flex h-44 w-full flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 text-slate-500 hover:border-slate-400"
              >
                <FileText className="h-8 w-8" />
                <p className="mt-3 font-medium text-slate-700">Välj PDF eller DOCX</p>
                <p className="text-sm text-slate-500">Funkar som fake-upload i preview</p>
                {selectedFileName && (
                  <p className="mt-2 text-xs text-emerald-700">Vald fil: {selectedFileName}</p>
                )}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  const nextFile = e.target.files?.[0];
                  setSelectedFileName(nextFile ? nextFile.name : null);
                }}
              />
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="flex items-center gap-2 text-2xl font-semibold text-slate-900">
                <FileText className="h-5 w-5" /> Personligt brev
              </h3>

              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="mt-4 h-44 w-full rounded-3xl border border-slate-200 p-3 text-sm leading-7 text-slate-700 outline-none"
              />
            </section>
          </div>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 flex items-center gap-2 text-2xl font-semibold text-slate-900">
              <Clock3 className="h-5 w-5" /> Ansökningshistorik
            </h3>

            <div className="mb-3 flex flex-wrap gap-2">
              {applicationTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveApplicationTab(tab)}
                  className={clsx(
                    "rounded-full border px-4 py-1.5 text-sm",
                    activeApplicationTab === tab
                      ? "border-slate-900 bg-slate-900 font-medium text-white"
                      : "border-slate-200 bg-white text-slate-700"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredApplications.map((application) => (
                <article
                  key={application.id}
                  className="flex items-start justify-between rounded-2xl border border-slate-200 p-4"
                >
                  <div>
                    <h4 className="text-2xl font-semibold text-slate-900">{application.title}</h4>
                    <p className="text-sm text-slate-500">{application.company}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-medium text-slate-800">{application.status}</p>
                    <p className="text-sm text-slate-500">{application.date}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
