"use client";

type PageMainProps = {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
  id?: string;
};

/** Consistent content width/padding — AppShell already owns the sidebar offset. */
export function PageMain({ children, className = "", narrow = false, id }: PageMainProps) {
  return (
    <main
      id={id}
      role="main"
      className={`mx-auto w-full px-[var(--app-page-x)] pt-[var(--app-page-y)] pb-[calc(var(--app-page-y)+0.5rem)] lg:pb-[var(--app-page-y)] ${
        narrow ? "max-w-3xl" : "max-w-6xl"
      } ${className}`}
    >
      {children}
    </main>
  );
}
