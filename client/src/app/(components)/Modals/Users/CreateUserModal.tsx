import React, { ChangeEvent, FormEvent, useState } from "react";
import Header from "@/app/(components)/Header";
import { useGetUserTypesQuery } from "@/state/api";

type UserFormData = {
  userTypeId: number;
  username: string;
  email: string;
  password: string;
};

type CreateUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: UserFormData) => void;
};

const CreateUserModal = ({ isOpen, onClose, onCreate }: CreateUserModalProps) => {
  const { data: userTypes, isLoading: userTypesLoading, isError: userTypesError } = useGetUserTypesQuery();
  const [formData, setFormData] = useState({
    userTypeId: 1,
    password: "",
    email: "",
    username: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "userTypeId" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles = "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Añadir usuario" />
        <form onSubmit={handleSubmit} className="mt-5">
          {/* user NAME */}
          <label htmlFor="username" className={labelCssStyles}>
            Nombre de usuario
          </label>
          <input type="text" name="username" placeholder="Nombre de usuario" onChange={handleChange} value={formData.username} className={inputCssStyles} required />

          {/* user TYPE */}
          <label htmlFor="userType" className={labelCssStyles}>
            Tipo de Usuario
          </label>
          {userTypesLoading ? (
            <p>Loading...</p>
          ) : userTypesError ? (
            <p>Error loading user types</p>
          ) : (
            userTypes?.map((userType) => (
              <div key={userType.userTypeId}>
                <input type="radio" name="userTypeId" value={userType.userTypeId} checked={formData.userTypeId === userType.userTypeId} onChange={handleChange} className="mr-2" />
                <label>{userType.userType}</label>
              </div>
            ))
          )}

          {/* EMAIL */}
          <label htmlFor="email" className={labelCssStyles}>
            Email
          </label>
          <input type="email" name="email" placeholder="Correo electronico" onChange={handleChange} value={formData.email} className={inputCssStyles} required />

          {/* PASSWORD */}
          <label htmlFor="password" className={labelCssStyles}>
            Contraseña
          </label>
          <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} value={formData.password} className={inputCssStyles} required />

          {/* CREATE ACTIONS */}
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Crear
          </button>
          <button onClick={onClose} type="button" className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
