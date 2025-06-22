"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Em construção</h1>
    </div>
  );
};

export default Dashboard;
