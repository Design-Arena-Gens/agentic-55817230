import EngineWorkspace from "@/components/EngineWorkspace";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 py-24 text-slate-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 md:px-12 lg:px-20">
        <header className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.45em] text-slate-500">
            Agentic Operations Framework
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
            Orchestrate strategy, delivery, and design from a single autonomous command surface.
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
            Plug in the essentials and receive fully structured project architectures, tactical execution pathways,
            creative systems, and production-ready assets. Built to move from zero to deployment without friction.
          </p>
        </header>

        <EngineWorkspace />
      </main>
    </div>
  );
}
