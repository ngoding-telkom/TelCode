"use client";

import { useLanguages } from "../hooks/use-languages";

export function LanguageCatalog() {
  const { data, error, isLoading } = useLanguages();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">
            Runtime catalog
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">
            Bahasa yang tersedia
          </h2>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
          Infrastructure: API
        </span>
      </div>

      {isLoading ? (
        <p className="rounded-2xl bg-slate-50 px-4 py-6 text-sm text-slate-500">
          Memuat runtime...
        </p>
      ) : error ? (
        <p role="alert" className="rounded-2xl bg-rose-50 px-4 py-6 text-sm text-rose-700">
          {error}
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {data.map((language) => (
            <div
              key={language.id}
              className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
            >
              <span className="font-medium text-slate-800">{language.name}</span>
              <code className="text-xs text-slate-400">
                {language.fileExtension ?? "source"}
              </code>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
