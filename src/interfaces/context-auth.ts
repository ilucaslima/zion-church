import { IUser } from "./user";

export interface IAuthContextType {
  user: IUser | null;
  signIn: ({
    cpf,
    password,
  }: {
    cpf: string;
    password: string;
  }) => Promise<void>;
  signUp: ({
    name,
    cpf,
    password,
  }: {
    name: string;
    cpf: string;
    password: string;
  }) => Promise<void>;
}
