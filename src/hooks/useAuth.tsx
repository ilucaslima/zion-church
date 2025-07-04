"use client";

import { createContext, useContext, useEffect, useState } from "react";
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
    cpf,
    password,
  }: {
    cpf: string;
    password: string;
  }) => {
    try {
      const response = await api.post("/users/auth", {
        cpf,
        password,
        name,
      });
      setUser(response.data.user);
      toast.success("Login realizado com sucesso");
      Cookies.set("token", response.data.token);
      Cookies.set("user", JSON.stringify(response.data.user));
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
    name,
  }: {
    cpf: string;
    password: string;
    name: string;
  }) => {
    try {
      const response = await api.post("/users/", {
        cpf: cpf,
        password,
        name,
      });
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

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
