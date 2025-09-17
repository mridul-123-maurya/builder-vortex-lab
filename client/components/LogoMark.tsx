import * as React from "react";

export default function LogoMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Monastery mark"
      role="img"
      fill="currentColor"
      {...props}
    >
      <path d="M12 2l4 3h-3v2h-2V5H8l4-3z" />
      <path d="M5 9h14l-2 2H7L5 9z" />
      <path d="M6 11h12v7H6z" />
      <path d="M10 14h4v4h-4z" />
      <path d="M4 20h16v2H4z" />
    </svg>
  );
}
