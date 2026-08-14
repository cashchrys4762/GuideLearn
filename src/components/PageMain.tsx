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
      className={`mx-auto w-full px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8 pb-28 md:pb-10 ${
        narrow ? "max-w-3xl" : "max-w-6xl"
      } ${className}`}
    >
      {children}
    </main>
  );
}
