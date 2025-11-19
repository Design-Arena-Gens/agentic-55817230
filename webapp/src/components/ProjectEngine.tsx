'use client';

import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";
import {
  ProjectBlueprint,
  ProjectInput,
  generateProjectBlueprint,
} from "@/lib/projectEngine";

const initialForm = {
  name: "Command Atlas Transformation",
  vision:
    "Launch a unified command center so enterprise leaders can orchestrate growth and operations from a single canvas.",
  industry: "Enterprise SaaS",
  timeframe: "16-week sprint program",
  budget: "$1.8M envelope",
  goals: [
    "Compress decision cycles for executives",
    "Digitize cross-functional playbooks",
    "Prove measurable ROI within one quarter",
  ].join("\n"),
  kpis: ["Decision cycle time", "Adoption across regions", "Net promoter score uplift"].join("\n"),
  stakeholders: ["Chief Strategy Officer", "VP Product", "Head of RevOps", "PMO Director"].join("\n"),
  team: ["Program Director", "Product Strategist", "Design Architect", "Lead Engineer", "Change Lead"].join("\n"),
  constraints: ["Complex legacy systems", "Compressed go-live timeline", "Strict compliance reviews"].join("\n"),
};

type FormState = typeof initialForm;

export default function ProjectEngine() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [blueprint, setBlueprint] = useState<ProjectBlueprint | null>(null);
  const [touches, setTouches] = useState(0);

  const parsedInput = useMemo<ProjectInput>(
    () => ({
      name: form.name,
      vision: form.vision,
      industry: form.industry,
      timeframe: form.timeframe,
      budget: form.budget,
      goals: tokenize(form.goals),
      kpis: tokenize(form.kpis),
      stakeholders: tokenize(form.stakeholders),
      team: tokenize(form.team),
      constraints: tokenize(form.constraints),
    }),
    [form],
  );

  const handleGenerate = () => {
    setBlueprint(generateProjectBlueprint(parsedInput));
    setTouches((value) => value + 1);
  };

  const handleReset = () => {
    setForm(initialForm);
    setBlueprint(null);
    setTouches(0);
  };

  const handleField = (key: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <section className="space-y-10 rounded-3xl border border-black/10 bg-white p-10 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.35)] backdrop-blur-md">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
          Project Management Engine
        </p>
        <h2 className="text-3xl font-semibold text-slate-950">Architect the entire delivery system in minutes.</h2>
        <p className="text-sm leading-relaxed text-slate-600">
          Feed the engine with the essentials. It synthesizes scope, playbooks, and governance into ready-to-ship
          artifacts that make steering effortless.
        </p>
      </header>

      <div className="grid gap-6 rounded-2xl bg-slate-50/70 p-6 lg:grid-cols-[minmax(0,360px),1fr]">
        <div className="space-y-4">
          <Field label="Initiative name">
            <input
              className="form-input"
              value={form.name}
              onChange={handleField("name")}
              placeholder="Program title"
            />
          </Field>
          <Field label="Vision narrative">
            <textarea
              className="form-input min-h-[120px]"
              value={form.vision}
              onChange={handleField("vision")}
              placeholder="What are we unlocking?"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Industry context">
              <input className="form-input" value={form.industry} onChange={handleField("industry")} />
            </Field>
            <Field label="Timeframe">
              <input className="form-input" value={form.timeframe} onChange={handleField("timeframe")} />
            </Field>
            <Field label="Budget guardrail">
              <input className="form-input" value={form.budget} onChange={handleField("budget")} />
            </Field>
          </div>
        </div>

        <div className="grid gap-4">
          <Field label="Primary goals (one per line)">
            <textarea className="form-input min-h-[96px]" value={form.goals} onChange={handleField("goals")} />
          </Field>
          <Field label="Success KPIs">
            <textarea className="form-input min-h-[96px]" value={form.kpis} onChange={handleField("kpis")} />
          </Field>
          <Field label="Stakeholders & sponsors">
            <textarea
              className="form-input min-h-[96px]"
              value={form.stakeholders}
              onChange={handleField("stakeholders")}
            />
          </Field>
          <Field label="Core team capabilities">
            <textarea className="form-input min-h-[96px]" value={form.team} onChange={handleField("team")} />
          </Field>
          <Field label="Constraints & watch-outs">
            <textarea
              className="form-input min-h-[96px]"
              value={form.constraints}
              onChange={handleField("constraints")}
            />
          </Field>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button onClick={handleGenerate} className="primary-button">
          Generate Master Plan
        </button>
        <button onClick={handleReset} className="secondary-button">
          Reset Inputs
        </button>
        <span className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
          {touches ? `Versions generated: ${touches}` : "Ready for ignition"}
        </span>
      </div>

      {blueprint && (
        <div className="space-y-12">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,360px),1fr]">
            <Card title="North-star narrative">
              <SectionList
                items={[
                  blueprint.summary.northStar,
                  blueprint.summary.positioning,
                  ...blueprint.summary.valueStreams,
                ]}
              />
            </Card>
            <Card title="Program architecture">
              <div className="grid gap-6 lg:grid-cols-2">
                <SectionBlock label="Scope">{blueprint.architecture.scope}</SectionBlock>
                <SectionBlock label="Objectives">
                  <SectionList items={blueprint.architecture.objectives} />
                </SectionBlock>
                <SectionBlock label="KPIs">
                  <SectionList items={blueprint.architecture.kpis} />
                </SectionBlock>
                <SectionBlock label="Deliverables">
                  <SectionList items={blueprint.architecture.deliverables} />
                </SectionBlock>
              </div>
            </Card>
          </div>

          <Card title="Work breakdown structure">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {blueprint.architecture.wbs.map((workstream) => (
                <div key={workstream.title} className="rounded-2xl border border-slate-200 bg-white/70 p-5 backdrop-blur">
                  <h4 className="text-sm font-semibold text-slate-900">{workstream.title}</h4>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Owner · {workstream.owner}</p>
                  <SectionList className="mt-3 text-sm text-slate-600" items={workstream.workItems} />
                </div>
              ))}
            </div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Execution pathway">
              <div className="space-y-5">
                {blueprint.executionPath.map((phase) => (
                  <div key={phase.name} className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.36em] text-slate-400">{phase.name}</p>
                    <p className="mt-2 text-sm text-slate-600">{phase.focus}</p>
                    <SectionList className="mt-3 text-sm text-slate-600" items={phase.steps} />
                  </div>
                ))}
              </div>
            </Card>

            <div className="space-y-6">
              <Card title="Milestones & cadence">
                <SectionList items={blueprint.architecture.milestones} className="text-sm text-slate-600" />
              </Card>
              <Card title="Risks & dependencies">
                <SectionBlock label="Risk posture">
                  <ul className="space-y-2 text-sm text-slate-600">
                    {blueprint.architecture.risks.map((risk) => (
                      <li key={risk.title}>
                        <span className="font-semibold text-slate-900">{risk.probability}</span> · {risk.title} —{" "}
                        {risk.mitigation}
                      </li>
                    ))}
                  </ul>
                </SectionBlock>
                <SectionBlock label="Dependencies">
                  <SectionList items={blueprint.architecture.dependencies} className="text-sm text-slate-600" />
                </SectionBlock>
              </Card>
              <Card title="Strategic recommendations">
                <SectionList items={blueprint.recommendations} className="text-sm text-slate-600" />
              </Card>
            </div>
          </div>

          <Card title="Ready-to-deploy documents">
            <div className="space-y-6">
              <DocumentSection title="Project Charter" sections={blueprint.documents.charter} />
              <DocumentSection title="Statement of Work" sections={blueprint.documents.sow} />
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-5">
                <h4 className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500">RACI Matrix</h4>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-[0.28em] text-slate-400">
                      <tr>
                        <th className="px-3 py-2 text-left">Activity</th>
                        <th className="px-3 py-2 text-left">Responsible</th>
                        <th className="px-3 py-2 text-left">Accountable</th>
                        <th className="px-3 py-2 text-left">Consulted</th>
                        <th className="px-3 py-2 text-left">Informed</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {blueprint.documents.raci.map((entry) => (
                        <tr key={entry.activity} className="bg-white/70 text-slate-700">
                          <td className="px-3 py-2 font-semibold text-slate-900">{entry.activity}</td>
                          <td className="px-3 py-2">{entry.responsible}</td>
                          <td className="px-3 py-2">{entry.accountable}</td>
                          <td className="px-3 py-2">{entry.consulted}</td>
                          <td className="px-3 py-2">{entry.informed}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <DocumentTimeline title="Timeline" entries={blueprint.documents.timeline} />
              <DocumentRoadmap title="Roadmap" entries={blueprint.documents.roadmap} />
            </div>
          </Card>
        </div>
      )}
    </section>
  );
}

function tokenize(value: string): string[] {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-semibold uppercase tracking-[0.36em] text-slate-500">{label}</span>
      {children}
    </label>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6">
      <h3 className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">{title}</h3>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function SectionList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={`space-y-2 ${className ?? "text-sm text-slate-700"}`}>
      {items.map((item) => (
        <li key={item} className="leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}

function SectionBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-400">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function DocumentSection({ title, sections }: { title: string; sections: ProjectBlueprint["documents"]["charter"] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-5">
      <h4 className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500">{title}</h4>
      <div className="mt-4 space-y-4">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">{section.title}</p>
            <SectionList items={section.items} className="mt-2 text-sm text-slate-600" />
          </div>
        ))}
      </div>
    </div>
  );
}

function DocumentTimeline({
  title,
  entries,
}: {
  title: string;
  entries: ProjectBlueprint["documents"]["timeline"];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-5">
      <h4 className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500">{title}</h4>
      <div className="mt-4 space-y-4">
        {entries.map((entry) => (
          <div key={entry.period} className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{entry.period}</p>
            <p className="text-sm text-slate-600">{entry.focus}</p>
            <SectionList items={entry.checkpoints} className="text-sm text-slate-600" />
          </div>
        ))}
      </div>
    </div>
  );
}

function DocumentRoadmap({
  title,
  entries,
}: {
  title: string;
  entries: ProjectBlueprint["documents"]["roadmap"];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-5">
      <h4 className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500">{title}</h4>
      <div className="mt-4 space-y-4">
        {entries.map((entry) => (
          <div key={entry.horizon} className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{entry.horizon}</p>
            <SectionBlock label="Outcomes">
              <SectionList items={entry.outcomes} className="text-sm text-slate-600" />
            </SectionBlock>
            <SectionBlock label="Enablers">
              <SectionList items={entry.enablers} className="text-sm text-slate-600" />
            </SectionBlock>
          </div>
        ))}
      </div>
    </div>
  );
}
