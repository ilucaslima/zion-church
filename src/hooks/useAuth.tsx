"use client";

import { createContext, useContext, useState } from "react";
import { api } from "@/services/api";
import { IAuthContextType } from "@/interfaces/context-auth";
import { IUser } from "@/interfaces/user";
import { AppError } from "./AppError";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

const AuthContext = createContext<IAuthContextType>({} as IAuthContextType);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      console.log(email, password);
      const response = await api.post("/users/auth", { email, password });
      setUser(response.data);
      toast.success("Login realizado com sucesso");
      Cookies.set("session", response.data.token);
      Cookies.set("user", JSON.stringify(response.data));
      router.push("/dashboard");
    } catch (error) {
      if (AppError.isAxiosError(error)) {
        throw error;
      }

      throw AppError.internalServerError("Erro ao fazer login");
    }
  };

  const signUp = async ({
    cpf,
    password,
  }: {
    cpf: string;
    password: string;
  }) => {
    try {
      const response = await api.post("/users/", { email: cpf, password });
      setUser(response.data);
      toast.success("Cadastro realizado com sucesso");
      router.push("/auth/login");
    } catch (error) {
      if (AppError.isAxiosError(error)) {
        throw error;
      }

      throw AppError.internalServerError("Erro ao fazer cadastro");
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
