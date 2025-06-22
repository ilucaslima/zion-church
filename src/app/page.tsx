"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import React from "react";

const Welcome: React.FC = () => {
  const router = useRouter();

  const handleEnter = () => {
    router.push("/auth/login");
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-10 text-2xl font-bold">Bem-vindo</h1>
      <Button onClick={handleEnter} className="px-24">
        Entrar
      </Button>
    </div>
  );
};

export default Welcome;
