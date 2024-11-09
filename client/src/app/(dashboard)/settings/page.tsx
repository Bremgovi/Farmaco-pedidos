"use client";

import React, { useState, useEffect } from "react";
import Header from "@/app/(components)/Header";
import { logoutUser, setIsDarkMode } from "@/state";
import { notify } from "@/utils/toastConfig";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { useRouter } from "next/navigation";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetLoginInfoQuery } from "@/state/api";
import { withAuth } from "../withAuth";

type UserSetting = {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
};

const mockSettings: UserSetting[] = [
  { label: "Usuario", value: "john_doe", type: "text" },
  { label: "Email", value: "john.doe@example.com", type: "text" },
  { label: "Notificaciones", value: true, type: "toggle" },
  { label: "Modo Oscuro", value: false, type: "toggle" },
  { label: "Lenguaje", value: "English", type: "text" },
];

const Settings = () => {
  const [userSettings, setUserSettings] = useState<UserSetting[]>(mockSettings);
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };
  const { data: userData } = useGetLoginInfoQuery();

  useEffect(() => {
    if (userData) {
      const updatedSettings = userSettings.map((setting) => {
        if (setting.label === "Usuario") {
          return { ...setting, value: userData.username };
        } else if (setting.label === "Email") {
          return { ...setting, value: userData.email };
        } else {
          return setting;
        }
      });
      setUserSettings(updatedSettings);
    }
  }, [userData]);

  useEffect(() => {
    const updatedSettings = userSettings.map((setting) => {
      if (setting.label === "Modo Oscuro") {
        return { ...setting, value: isDarkMode };
      } else {
        return setting;
      }
    });
    setUserSettings(updatedSettings);
  }, [isDarkMode]);

  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("userToken");
    notify("Logged out", "success");
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  };

  const handleToggleChange = (index: number) => {
    const settingsCopy = [...userSettings];
    settingsCopy[index].value = !settingsCopy[index].value as boolean;
    setUserSettings(settingsCopy);
    if (settingsCopy[index].label === "Modo Oscuro") {
      toggleDarkMode();
    }
  };

  return (
    <div className="w-full">
      <Header name="Ajustes de usuario" />
      <div className="overflow-x-auto mt-5 shadow-md">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Ajuste</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Valor</th>
            </tr>
          </thead>
          <tbody>
            {userSettings.map((setting, index) => (
              <tr className="hover:bg-blue-50" key={setting.label}>
                <td className="py-2 px-4">{setting.label}</td>
                <td className="py-2 px-4">
                  {setting.type === "toggle" ? (
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={setting.value as boolean} onChange={() => handleToggleChange(index)} />
                      <div
                        className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-blue-400 peer-focus:ring-4 
                        transition peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                        peer-checked:bg-blue-600"
                      ></div>
                    </label>
                  ) : (
                    <input
                      type="text"
                      className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
                      value={setting.value as string}
                      onChange={(e) => {
                        const settingsCopy = [...userSettings];
                        settingsCopy[index].value = e.target.value;
                        setUserSettings(settingsCopy);
                      }}
                      disabled
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleLogout} className="mt-5 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
        Logout
      </button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default withAuth(Settings);
