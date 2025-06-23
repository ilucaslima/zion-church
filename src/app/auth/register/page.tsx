"use client";

import Card from "@/components/Card";
import CpfInput from "@/components/CPFInput";
import Input from "@/components/Input";

import { useAuth } from "@/hooks/useAuth";
import { registerSchema, RegisterSchemaType } from "@/schemas/authSchema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export default function RegisterPage() {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const handleSignUp = async (data: RegisterSchemaType) => {
    setIsLoading(true);
    await signUp({
      name: data.name,
      cpf: data.cpf,
      password: data.password,
    });
    setIsLoading(false);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card
        title="Crie sua conta"
        description="Já tem uma conta?"
        descriptionLink={{
          text: "Faça login",
          href: "/auth/login",
        }}
        fields={
          <>
            <Input
              label="Nome"
              placeholder="Nome"
              {...register("name")}
              error={errors.name?.message}
            />
            <CpfInput
              label="CPF"
              placeholder="000.000.000-00"
              {...register("cpf")}
              error={errors.cpf?.message}
            />
            <Input
              label="Senha"
              placeholder="Senha"
              type="PASSWORD"
              {...register("password")}
              error={errors.password?.message}
            />
          </>
        }
        buttonText="Cadastrar"
        onButtonClick={handleSubmit(handleSignUp)}
        isLoading={isLoading}
        bottomLink={{
          text: "Já tenho conta",
          href: "/auth/login",
        }}
      />
    </div>
  );
}
