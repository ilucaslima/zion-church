"use client";
import { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import Logo from "../../public/logo.svg";
import { Loader2 } from "lucide-react";
import Button from "./Button";

interface ICardProps {
  title: string;
  description: string;
  descriptionLink?: {
    text: string;
    href: string;
  };
  fields: ReactNode;
  buttonText: string;
  onButtonClick: () => void;
  isLoading?: boolean;
  bottomLink?: {
    text: string;
    href: string;
  };
}

export default function Card({
  title,
  description,
  descriptionLink,
  fields,
  buttonText,
  onButtonClick,
  bottomLink,
  isLoading,
}: ICardProps) {
  return (
    <div className="bg-background border-border absolute bottom-0 m-auto w-full max-w-[var(--width-card)] rounded-t-[54px] border px-7 py-14 md:relative md:rounded-[54px] md:p-20">
      <Image src={Logo} alt="logo" className="m-auto mb-14 md:mb-20" />
      <h2 className="text-center text-2xl font-bold md:text-4xl">{title}</h2>
      <p className="text-secondary mt-4 mb-14 text-center text-sm">
        {description}
        {descriptionLink && (
          <>
            {" "}
            <a
              href={descriptionLink.href}
              className="text-effect font-bold underline"
            >
              {descriptionLink.text}
            </a>
          </>
        )}
      </p>

      <div className="flex flex-col gap-4">{fields}</div>

      <Button
        onClick={onButtonClick}
        disabled={isLoading}
        className="mt-20 w-full"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : buttonText}
      </Button>

      {bottomLink && (
        <div className="mt-4 text-xs">
          <Link href={bottomLink.href}>{bottomLink.text}</Link>
        </div>
      )}
    </div>
  );
}
