"use client";

import Card from "@/components/Card";
import CpfInput from "@/components/CPFInput";
import Input from "@/components/Input";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema, LoginSchemaType } from "@/schemas/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export default function LoginPage() {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const handleSignIn = async (data: LoginSchemaType) => {
    setIsLoading(true);
    await signIn({
      cpf: data.cpf,
      password: data.password,
    }).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card
        title="Acesse sua conta"
        description="Não tem acesso a plataforma?"
        descriptionLink={{
          text: "Clique aqui",
          href: "#",
        }}
        fields={
          <>
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
        buttonText="Entrar"
        isLoading={isLoading}
        onButtonClick={handleSubmit(handleSignIn)}
        bottomLink={{
          text: "Cadastre-se",
          href: "/auth/register",
        }}
      />
    </div>
  );
}
