"use client";
import { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import Logo from "../../public/logo.svg";

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

      <button
        onClick={onButtonClick}
        className="pointer mt-20 w-full rounded-full bg-[#008980] py-2 text-center"
      >
        {buttonText}
      </button>

      {bottomLink && (
        <div className="mt-4 text-xs">
          <Link href={bottomLink.href}>{bottomLink.text}</Link>
        </div>
      )}
    </div>
  );
}
