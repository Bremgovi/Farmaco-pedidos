"use client";

import React, { useEffect } from "react";
import StoreProvider, { useAppSelector } from "../redux";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  });

  return (
    <div className={`${isDarkMode ? "dark" : "light"} flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
      <main className={"flex flex-col w-full h-full py-7 px-9 bg-gray-50 md:pl-24"}>{children}</main>
    </div>
  );
};

const LoginWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <LoginLayout>{children}</LoginLayout>
    </StoreProvider>
  );
};

export default LoginWrapper;
