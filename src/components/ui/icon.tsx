type IconName = "arrow" | "bag" | "menu" | "pin" | "heart" | "clock";

const paths: Record<IconName, React.ReactNode> = {
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  bag: <><path d="M5 7h14l1 14H4L5 7Z" /><path d="M8 8V6a4 4 0 0 1 8 0v2" /></>,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  heart: <path d="m12 21-8-8C-3 6 7-2 12 5c5-7 15 1 8 8l-8 8Z" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
};

export function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
