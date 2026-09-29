type IconName =
  | "arrow"
  | "bag"
  | "home"
  | "cookie"
  | "chat"
  | "pin"
  | "heart"
  | "clock"
  | "leaf"
  | "hand-heart"
  | "gift"
  | "truck";

const paths: Record<IconName, React.ReactNode> = {
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  bag: (
    <>
      <path d="M5 7h14l1 14H4L5 7Z" />
      <path d="M8 8V6a4 4 0 0 1 8 0v2" />
    </>
  ),
  home: (
    <>
      <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z" />
      <path d="M9 21v-8h6v8" />
    </>
  ),
  cookie: (
    <>
      <path d="M20 11a5 5 0 0 1-7-7 9 9 0 1 0 7 7Z" />
      <g fill="currentColor" stroke="none">
        <circle cx="8" cy="10" r="1.2" />
        <circle cx="9" cy="16" r="1" />
        <circle cx="15" cy="16" r="1.2" />
        <circle cx="5" cy="14" r=".8" />
      </g>
    </>
  ),
  chat: (
    <>
      <path d="M21 11a9 8 0 0 1-9 8 10 10 0 0 1-4-.8L3 21l1.2-5A7.4 7.4 0 0 1 3 11a9 8 0 0 1 18 0Z" />
      <path d="M8 9h8M8 13h5" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  heart: <path d="m12 21-8-8C-3 6 7-2 12 5c5-7 15 1 8 8l-8 8Z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 3C9 2 3 7 4 14c1 6 8 7 12 2 3-4 4-9 4-13ZM3 22 17 6M8 16l-1-5m5 1 5 1" />
    </>
  ),
  "hand-heart": (
    <>
      <path d="m12 10-4-4C5 3 9 0 12 3c3-3 7 0 4 3l-4 4ZM2 16l4-3h5a2 2 0 0 1 0 4H8m5-1 6-3a2 2 0 0 1 2 3l-7 5H6l-2 1-2-6Z" />
    </>
  ),
  gift: (
    <>
      <path d="M3 10h18v11H3V10ZM2 6h20v4H2V6Zm10 0v15" />
      <path d="M12 6H8a3 3 0 1 1 3-3l1 3Zm0 0h4a3 3 0 1 0-3-3l-1 3Z" />
    </>
  ),
  truck: (
    <>
      <path d="M1 4h13v14H8m-4 0H1m13-9h5l4 5v4h-3m-4 0h-2m4-9v5h5" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </>
  ),
};

export function Icon({
  name,
  className = "size-5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
