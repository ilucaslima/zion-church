"use client";

import { InputHTMLAttributes, useState } from "react";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  type?: "PASSWORD";
  error?: string;
}

export default function Input({ label, type, error, ...rest }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const getInputType = () => {
    if (type === "PASSWORD") {
      return isPasswordVisible ? "text" : "password";
    }
    return "text";
  };

  return (
    <>
      <div
        className={twMerge(
          "relative flex rounded-md border border-white p-4 text-sm",
          error && "border-red-500",
        )}
      >
        {label && (
          <label className="bg-background text-label absolute -top-2.5 px-1 text-xs">
            {label}
          </label>
        )}
        <input
          {...rest}
          className="w-full bg-transparent px-1 text-sm"
          type={getInputType()}
          autoComplete="off"
        />

        {type === "PASSWORD" && (
          <button
            type="button"
            className="absolute top-1/2 right-2 -translate-y-1/2 p-2"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <EyeIcon className="h-4 w-4" />
            ) : (
              <EyeOffIcon className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-left text-xs text-red-500">{error}</p>}
    </>
  );
}
