type IconName = "arrow" | "bag" | "home" | "cookie" | "chat" | "pin" | "heart" | "clock";

const paths: Record<IconName, React.ReactNode> = {
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  bag: <><path d="M5 7h14l1 14H4L5 7Z" /><path d="M8 8V6a4 4 0 0 1 8 0v2" /></>,
  home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z" /><path d="M9 21v-8h6v8" /></>,
  cookie: <><path d="M20 11a5 5 0 0 1-7-7 9 9 0 1 0 7 7Z" /><g fill="currentColor" stroke="none"><circle cx="8" cy="10" r="1.2" /><circle cx="9" cy="16" r="1" /><circle cx="15" cy="16" r="1.2" /><circle cx="5" cy="14" r=".8" /></g></>,
  chat: <><path d="M21 11a9 8 0 0 1-9 8 10 10 0 0 1-4-.8L3 21l1.2-5A7.4 7.4 0 0 1 3 11a9 8 0 0 1 18 0Z" /><path d="M8 9h8M8 13h5" /></>,
  pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  heart: <path d="m12 21-8-8C-3 6 7-2 12 5c5-7 15 1 8 8l-8 8Z" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
};

export function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
