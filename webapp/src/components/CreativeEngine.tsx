'use client';

import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";
import {
  type CreativeBlueprint,
  type CreativeInput,
  generateCreativeBlueprint,
} from "@/lib/designEngine";

const initialForm = {
  brandName: "Omar Atlas",
  product: "strategic operating system for visionary founders",
  audience: "design-forward CEOs and product leaders",
  mood: "minimal, cinematic, confident",
  keywords: ["premium", "architectural lighting", "neofuturism", "negative space"].join("\n"),
  palette: ["#080C14", "#121C2B", "#2D4059", "#8EA7C2", "#F7F9FC"].join("\n"),
  differentiators: ["Narrative-driven decisions", "Command center intelligence", "Tailored brand-to-build handoff"].join(
    "\n",
  ),
};

type FormState = typeof initialForm;

export default function CreativeEngine() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [blueprint, setBlueprint] = useState<CreativeBlueprint | null>(null);
  const [touches, setTouches] = useState(0);

  const parsedInput = useMemo<CreativeInput>(
    () => ({
      brandName: form.brandName,
      product: form.product,
      audience: form.audience,
      mood: form.mood,
      keywords: tokenize(form.keywords),
      palette: tokenize(form.palette),
      differentiators: tokenize(form.differentiators),
    }),
    [form],
  );

  const handleGenerate = () => {
    setBlueprint(generateCreativeBlueprint(parsedInput));
    setTouches((value) => value + 1);
  };

  const handleReset = () => {
    setForm(initialForm);
    setBlueprint(null);
    setTouches(0);
  };

  const handleField = (key: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({
      ...current,
      [key]: event.target.value,
    }));
  };

  return (
    <section className="space-y-10 rounded-3xl border border-white/20 bg-slate-900 p-10 text-white shadow-[0_40px_120px_-60px_rgba(15,23,42,0.65)]">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
          Creative &amp; Design Intelligence
        </p>
        <h2 className="text-3xl font-semibold">Translate brand intent into deployment-ready systems.</h2>
        <p className="text-sm leading-relaxed text-slate-300">
          Set the creative ground-truth. The engine outputs production-grade prompts, systems, and copy that land the
          right narrative instantly.
        </p>
      </header>

      <div className="grid gap-6 rounded-2xl bg-slate-800/60 p-6 lg:grid-cols-[minmax(0,360px),1fr]">
        <div className="space-y-4">
          <Field label="Brand identity">
            <input className="form-input-dark" value={form.brandName} onChange={handleField("brandName")} />
          </Field>
          <Field label="Product or experience">
            <textarea
              className="form-input-dark min-h-[96px]"
              value={form.product}
              onChange={handleField("product")}
            />
          </Field>
          <Field label="Primary audience">
            <input className="form-input-dark" value={form.audience} onChange={handleField("audience")} />
          </Field>
          <Field label="Mood & tone">
            <input className="form-input-dark" value={form.mood} onChange={handleField("mood")} />
          </Field>
        </div>
        <div className="grid gap-4">
          <Field label="Visual keywords">
            <textarea className="form-input-dark min-h-[96px]" value={form.keywords} onChange={handleField("keywords")} />
          </Field>
          <Field label="Color palette">
            <textarea className="form-input-dark min-h-[96px]" value={form.palette} onChange={handleField("palette")} />
          </Field>
          <Field label="Differentiators">
            <textarea
              className="form-input-dark min-h-[96px]"
              value={form.differentiators}
              onChange={handleField("differentiators")}
            />
          </Field>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button onClick={handleGenerate} className="primary-button glow">
          Generate Creative System
        </button>
        <button onClick={handleReset} className="secondary-button-dark">
          Reset Inputs
        </button>
        <span className="text-xs font-medium uppercase tracking-[0.32em] text-slate-500">
          {touches ? `Systems generated: ${touches}` : "Awaiting brief"}
        </span>
      </div>

      {blueprint && (
        <div className="space-y-12">
          <Card title="Narrative architecture">
            <SectionList items={[blueprint.narrative.positioning, blueprint.narrative.voice, blueprint.narrative.promise]} />
          </Card>

          <Card title="Midjourney production prompts">
            <PromptGrid prompts={blueprint.prompts} />
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Figma blueprint">
              <div className="space-y-5">
                <SectionBlock label="Layout framework">
                  <p className="text-sm text-slate-200">{blueprint.figmaSystem.layout.grid}</p>
                  <p className="mt-1 text-sm text-slate-300">{blueprint.figmaSystem.layout.spacing}</p>
                  <SectionList items={blueprint.figmaSystem.layout.breakpoints} className="mt-3 text-sm text-slate-300" />
                  <SectionList items={blueprint.figmaSystem.layout.notes} className="mt-3 text-sm text-slate-300" />
                </SectionBlock>
                <SectionBlock label="Component system">
                  <div className="space-y-4">
                    {blueprint.figmaSystem.components.map((component) => (
                      <div key={component.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <p className="font-semibold text-slate-100">{component.name}</p>
                        <p className="mt-1 text-sm text-slate-300">{component.usage}</p>
                        <SectionList items={component.states} className="mt-2 text-xs text-slate-400" />
                        <SectionList items={component.dataset} className="mt-2 text-xs text-slate-400" />
                      </div>
                    ))}
                  </div>
                </SectionBlock>
                <SectionBlock label="Experience flows">
                  <div className="space-y-4">
                    {blueprint.figmaSystem.flows.map((flow) => (
                      <div key={flow.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <p className="font-semibold text-slate-100">{flow.name}</p>
                        <SectionList items={flow.touchpoints} className="mt-2 text-sm text-slate-300" />
                        <p className="mt-3 text-xs uppercase tracking-[0.28em] text-slate-400">{flow.success}</p>
                      </div>
                    ))}
                  </div>
                </SectionBlock>
              </div>
            </Card>

            <div className="space-y-6">
              <Card title="Copy deck">
                <SectionBlock label="Hero message">
                  <p className="text-xl font-semibold text-white">{blueprint.content.hero}</p>
                  <p className="mt-2 text-sm text-slate-300">{blueprint.content.subheading}</p>
                </SectionBlock>
                <SectionBlock label="Primary CTAs">
                  <SectionList items={blueprint.content.ctas} className="text-sm text-slate-200" />
                </SectionBlock>
                <SectionBlock label="Value propositions">
                  <SectionList items={blueprint.content.valueProps} className="text-sm text-slate-300" />
                </SectionBlock>
                <SectionBlock label="Onboarding narrative">
                  <p className="text-sm text-slate-300">{blueprint.content.onboarding}</p>
                </SectionBlock>
              </Card>

              <Card title="Style & motion spec">
                <SectionBlock label="Color system">
                  <div className="space-y-2 text-sm text-slate-200">
                    {blueprint.styleGuide.palette.map((token) => (
                      <div key={token.value} className="flex items-center gap-3">
                        <span className="inline-flex h-8 w-8 rounded-full border border-white/20" style={{ background: token.value }} />
                        <div>
                          <p className="font-semibold">{token.name}</p>
                          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{token.value}</p>
                          <p className="text-xs text-slate-400">{token.usage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionBlock>
                <SectionBlock label="Typography">
                  <SectionList
                    items={blueprint.styleGuide.typography.map(
                      (token) => `${token.role} · ${token.font} · ${token.specs}`,
                    )}
                    className="text-sm text-slate-200"
                  />
                </SectionBlock>
                <SectionBlock label="Imagery">
                  <SectionList items={blueprint.styleGuide.imagery} className="text-sm text-slate-200" />
                </SectionBlock>
                <SectionBlock label="Motion">
                  <SectionList items={blueprint.styleGuide.motion} className="text-sm text-slate-200" />
                </SectionBlock>
                <SectionBlock label="Iconography">
                  <SectionList items={blueprint.styleGuide.iconography} className="text-sm text-slate-200" />
                </SectionBlock>
              </Card>

              <Card title="Activation recommendations">
                <SectionList items={blueprint.recommendations} className="text-sm text-slate-200" />
              </Card>
            </div>
          </div>
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
      <span className="text-xs font-semibold uppercase tracking-[0.36em] text-slate-400">{label}</span>
      {children}
    </label>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">{title}</h3>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function SectionList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-2 ${className ?? "text-sm text-slate-200"}`}>
      {items.map((item) => (
        <li key={item} className="leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}

function SectionBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-500">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function PromptGrid({ prompts }: { prompts: CreativeBlueprint["prompts"] }) {
  const labels: Record<string, string> = {
    hero: "Hero Visual",
    background: "Background System",
    branding: "Brand Signature",
    ux: "UI / UX Narrative",
    threeD: "3D Concept",
  };
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {Object.entries(prompts).map(([key, prompt]) => (
        <div key={key} className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">
            {labels[key] ?? key}
          </p>
          <p className="mt-2 text-sm text-slate-200">{prompt}</p>
        </div>
      ))}
    </div>
  );
}
