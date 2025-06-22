"use client";

import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  isLoading = false,
  ...rest
}: ButtonProps) {
  const baseClasses =
    "rounded-full font-bold transition-all duration-200 ease-in-out focus:outline-none px-24 flex items-center justify-center";

  const variantClasses = {
    primary: "bg-background-quaternary text-white hover:opacity-90",
    secondary: "bg-background-secondary text-white hover:opacity-90",
    tertiary:
      "bg-background-tertiary text-white border border-border hover:bg-background-tertiary",
  };

  const sizeClasses = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2 text-sm",
    lg: "px-8 py-3 text-base",
  };

  const widthClasses = fullWidth ? "w-full" : "";

  return (
    <button
      className={twMerge(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        widthClasses,
        className,
      )}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </button>
  );
}
