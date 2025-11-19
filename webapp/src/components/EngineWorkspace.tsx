'use client';

import { useState } from "react";
import CreativeEngine from "@/components/CreativeEngine";
import ProjectEngine from "@/components/ProjectEngine";

type TabId = "project" | "creative";

const tabs: { id: TabId; title: string; caption: string }[] = [
  {
    id: "project",
    title: "Project Command Engine",
    caption: "Scope, govern, and deliver every thread effortlessly.",
  },
  {
    id: "creative",
    title: "Creative Intelligence Engine",
    caption: "Translate vision into production-ready design systems.",
  },
];

export default function EngineWorkspace() {
  const [active, setActive] = useState<TabId>("project");

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`group max-w-[320px] rounded-3xl border px-5 py-4 text-left transition ${
                isActive
                  ? "border-slate-900 bg-slate-900 text-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.6)]"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-900/20 hover:bg-slate-50"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.36em] text-slate-400 group-hover:text-slate-500">
                {isActive ? "Active Engine" : "Activate"}
              </p>
              <p className="mt-2 text-lg font-semibold">{tab.title}</p>
              <p className="mt-1 text-sm text-slate-500">{tab.caption}</p>
            </button>
          );
        })}
      </div>

      <div>{active === "project" ? <ProjectEngine /> : <CreativeEngine />}</div>
    </div>
  );
}

