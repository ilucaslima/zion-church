import { AxiosError } from "axios";
import { toast } from "react-toastify";

export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }

  static isAxiosError(error: unknown): error is AxiosError {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
    }

    return error instanceof AxiosError;
  }

  static badRequest(message: string) {
    toast.error(message);
    return new AppError(message, 400);
  }

  static unauthorized(message: string) {
    toast.error(message);
    return new AppError(message, 401);
  }

  static notFound(message: string) {
    toast.error(message);
    return new AppError(message, 404);
  }

  static internalServerError(message: string) {
    toast.error(message);
    return new AppError(message, 500);
  }

  static forbidden(message: string) {
    toast.error(message);
    return new AppError(message, 403);
  }

  static conflict(message: string) {
    toast.error(message);
    return new AppError(message, 409);
  }
}
