"use client";
import { SessionProvider } from "next-auth/react";

// zapytac
const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;

// this has to be done this way because it needs to be a client component