"use client";

import { useSocketEvents } from "@/hooks/useSockets";

export const SocketEvents = () => {
  useSocketEvents();
  return null;
};
