import type { ReactNode } from "react";

interface AuthLayoutProps {
  heading: string;
  subheading: string;
  children: ReactNode;
}

export default function AuthLayout({
  heading,
  subheading,
  children,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden md:flex md:w-1/2 bg-primary text-primary-foreground flex-col justify-center px-16">
        <h1 className="font-heading text-4xl leading-tight mb-4">{heading}</h1>
        <p className="text-primary-foreground/80 max-w-sm">{subheading}</p>
      </div>

      {/* Right panel */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-8">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
