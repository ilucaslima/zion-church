"use client";

import Card from "@/components/Card";
import CpfInput from "@/components/CPFInput";
import Input from "@/components/Input";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema, LoginSchemaType } from "@/schemas/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginPage() {
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const handleSignIn = (data: LoginSchemaType) => {
    signIn({
      email: data.cpf,
      password: data.password,
    });
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[url('/background.png')] bg-cover bg-center">
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
        onButtonClick={handleSubmit(handleSignIn)}
        bottomLink={{
          text: "Cadastre-se",
          href: "/auth/register",
        }}
      />
    </div>
  );
}
