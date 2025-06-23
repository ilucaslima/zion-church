import { io, Socket } from "socket.io-client";

let socket: Socket;

export const getSocket = () => {
  if (!socket) {
    const url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3333/"
        : "https://zion-church-api-production.up.railway.app/";

    socket = io(url, {
      transports: ["websocket"],
    });
  }
  return socket;
};
