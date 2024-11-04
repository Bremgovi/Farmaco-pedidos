"use client";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLoginMutation } from "../../state/api";
import { notify } from "@/utils/toastConfig";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { logoutUser, setUserInfo, setUserToken } from "@/state";
import { useRouter } from "next/navigation";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsLoggedIn(true);
      router.push("/dashboard");
    }
  }, []);

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await login(formData).unwrap();
      console.log("Login successful, token:", result.token);
      notify("Login Succesful", "success");

      // Save token to redux and local storage
      localStorage.setItem("userToken", result.token);
      dispatch(setUserToken(result.token));
      dispatch(setUserInfo({ username: formData.username, password: formData.password }));

      // Redirect to dashboard

      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (err) {
      console.error("Login failed:", err);
      notify("Login failed", "error");
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("userToken");
    notify("Logged out", "success");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (isLoggedIn) {
    return null;
  } else {
    return (
      <div className="bg-sky-100 flex justify-center items-center w-full min-h-screen shadow-xl rounded-xl">
        <div className="hidden lg:block lg:w-3/4 h-full rounded-xl">
          <Image src="/login.avif" alt="Placeholder Image" className="object-cover w-full h-full rounded-l-xl" width={50} height={50} />
        </div>
        <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4 text-center">Inicio de sesión</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="text-gray-600">
                Nombre de usuario
              </label>
              <input
                type="text"
                name="username"
                placeholder="Nombre de usuario"
                onChange={handleChange}
                value={formData.username}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:shadow-lg hover:shadow-lg transition duration-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-800">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Contraseña"
                onChange={handleChange}
                value={formData.password}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 focus:shadow-lg hover:shadow-lg transition duration-300"
                required
              />
            </div>
            <div className="mb-6 text-blue-500">
              <Link href="#" className="hover:underline">
                Olvidaste tu contraseña?
              </Link>
            </div>
            <button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white text-lg font-semibold rounded-md py-2 px-4 w-full transition duration-300" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-6 text-green-500 text-center">
            <Link href="#" className="hover:underline font-semibold text-base">
              Registrate aqui
            </Link>
          </div>
        </div>
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
  }
};

export default Login;
