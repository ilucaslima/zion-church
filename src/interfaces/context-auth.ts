import { IUser } from "./user";

export interface IAuthContextType {
  user: IUser | null;
  signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  signUp: ({
    cpf,
    password,
  }: {
    cpf: string;
    password: string;
  }) => Promise<void>;
}
