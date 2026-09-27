import type { Metadata } from "next";
import { faqs } from "@/data/faqs";
export const metadata: Metadata = { title: "Preguntas frecuentes" };
export default function FaqPage() {
  return (
    <section className="page-container section-space">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Antes de tu próximo antojo</p>
        <h1 className="section-title mt-4 mb-10">¿Te quedó alguna duda?</h1>
        {faqs.map(([question, answer]) => (
          <details key={question} className="group border-b border-brand/20 py-5">
            <summary className="flex cursor-pointer items-center justify-between gap-4 py-2 font-semibold text-brand">
              {question}<span aria-hidden="true" className="text-xl group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
