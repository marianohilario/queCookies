export function Notice({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-brand/20 bg-yellow/20 p-4 text-sm leading-6 text-ink" role="status">{children}</div>;
}
