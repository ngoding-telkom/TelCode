import { LanguageCatalog } from "./presentation/components/language-catalog";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            TelCode / frontend foundation
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
            Solve problems. Ship with structure.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
            Frontend Clean Architecture menjaga aturan domain tetap terpisah dari
            React dan detail HTTP, sehingga fitur baru dapat dikembangkan tanpa
            mengikat inti aplikasi pada framework.
          </p>
        </header>

        <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Dependency direction
            </p>
            <div className="mt-6 space-y-3 text-sm">
              {[
                ["Domain", "entities + repository contracts"],
                ["Application", "use cases"],
                ["Infrastructure", "HTTP adapters"],
                ["Presentation", "hooks + UI components"],
              ].map(([layer, description]) => (
                <div
                  key={layer}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-800 px-4 py-3"
                >
                  <span className="font-medium text-slate-100">{layer}</span>
                  <span className="text-right text-slate-500">{description}</span>
                </div>
              ))}
            </div>
          </section>
          <LanguageCatalog />
        </div>
      </div>
      </main>
  );
}
