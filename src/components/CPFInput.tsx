"use client";

import { InputHTMLAttributes, useState } from "react";
import Input from "./Input";

interface CpfInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "onChange"
  > {
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function CpfInput({
  label,
  onChange,
  error,
  ...rest
}: CpfInputProps) {
  const [cpfValue, setCpfValue] = useState("");

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const numbersOnly = input.replace(/\D/g, "");
    const limitedNumbers = numbersOnly.slice(0, 11);

    let formatted = "";
    if (limitedNumbers.length <= 3) {
      formatted = limitedNumbers;
    } else if (limitedNumbers.length <= 6) {
      formatted = `${limitedNumbers.slice(0, 3)}.${limitedNumbers.slice(3)}`;
    } else if (limitedNumbers.length <= 9) {
      formatted = `${limitedNumbers.slice(0, 3)}.${limitedNumbers.slice(
        3,
        6,
      )}.${limitedNumbers.slice(6)}`;
    } else {
      formatted = `${limitedNumbers.slice(0, 3)}.${limitedNumbers.slice(
        3,
        6,
      )}.${limitedNumbers.slice(6, 9)}-${limitedNumbers.slice(9)}`;
    }

    setCpfValue(formatted);

    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: formatted,
        },
      };
      onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <Input
      {...rest}
      label={label}
      value={cpfValue}
      onChange={handleCpfChange}
      error={error}
    />
  );
}
