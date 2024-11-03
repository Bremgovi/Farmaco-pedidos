import React from "react";
import Header from "@/app/(components)/Header";

type DeleteUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const DeleteUserModal = ({ isOpen, onClose, onDelete }: DeleteUserModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-1/3 mx-auto p-5 border w-80 shadow-lg rounded-md bg-white">
        <span className="text-center">
          <Header name="Confirmar Eliminación" />
        </span>
        <p className="mt-4 text-center text-gray-700">¿Está seguro de que desea eliminar el(los) usuarios(s) seleccionado(s)?</p>
        <div className="flex justify-center mt-6">
          <button onClick={onDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
            Borrar
          </button>
          <button onClick={onClose} className="ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
