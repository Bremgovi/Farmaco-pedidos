"use client";

import { useGetUsersQuery, useDeleteUserMutation, useCreateUserMutation, useUpdateUserMutation } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { Pencil, PlusCircleIcon, Trash2 } from "lucide-react";
import { Bounce, ToastContainer } from "react-toastify";
import { notify } from "@/utils/toastConfig";
import "react-toastify/dist/ReactToastify.css";
import CreateUserModal from "../(components)/Modals/Users/CreateUserModal";
import DeleteUserModal from "../(components)/Modals/Users/DeleteUserModal";
import UpdateUserModal from "../(components)/Modals/Users/UpdateUserModal";

type UserFormData = {
  userTypeId: number;
  username: string;
  email: string;
  password: string;
};

type UserFormDataWithId = {
  userId: string;
  userTypeId: number;
  username: string;
  email: string;
  password: string;
};

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 90 },
  { field: "username", headerName: "Username", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "password", headerName: "Password", width: 200 },
  {
    field: "userTypeId",
    headerName: "User Type",
    width: 150,
    type: "number",
  },
];

const Users = () => {
  const { data: users, isError, isLoading, refetch } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserFormDataWithId | null>(null);

  const handlecreateUser = async (userData: UserFormData) => {
    await createUser(userData);
    notify("Producto creado correctamente", "success");
  };

  const handleupdateUser = async (userData: UserFormDataWithId) => {
    if (selectedUser) {
      await updateUser({ userId: selectedUser.userId, updatedUser: userData });
      notify("Producto actualizado correctamente", "success");
    }
  };

  const handleDelete = async () => {
    for (const id of selectedRowIds) {
      await deleteUser(id);
    }
    setSelectedRowIds([]);
    refetch();
    setIsDeleteModalOpen(false);
    notify("Producto eliminado correctamente", "success");
  };

  const handleRowSelection = (selectionModel: any) => {
    const selectedData = users?.filter((product) => selectionModel.includes(product.userId));
    setSelectedRowIds(selectedData?.map((product) => product.userId) || []);
  };

  const openDeleteModal = () => {
    if (selectedRowIds.length === 0) {
      notify("Por favor, seleccione al menos un producto para eliminar.", "error");
      return;
    }
    setIsDeleteModalOpen(true);
  };

  const openUpdateModal = () => {
    if (selectedRowIds.length !== 1) {
      notify("Por favor, seleccione un producto para actualizar.", "error");
      return;
    }
    const productToEdit = users?.find((product) => product.userId === selectedRowIds[0]);
    if (productToEdit) {
      setSelectedUser(productToEdit);
      setIsUpdateModalOpen(true);
    }
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }
  if (isError || !users) {
    return <div className="text-center text-red-500 py-4 text-xl">Failed to fetch users</div>;
  }
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <Header name="Usuarios" />
        <div className="flex gap-4">
          <button className="inline-flex justify-center items-center hover:bg-blue-100 rounded-full p-2" onClick={openUpdateModal}>
            <Pencil className="text-gray-600" />
          </button>
          <button className="inline-flex justify-center items-center hover:bg-blue-100 rounded-full p-2" onClick={() => setIsCreateModalOpen(true)}>
            <PlusCircleIcon className="text-blue-600" />
          </button>
          <button className="inline-flex justify-center items-center mr-5 hover:bg-red-100 rounded-full p-2" onClick={openDeleteModal}>
            <Trash2 className="text-red-600" />
          </button>
        </div>
      </div>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        onRowSelectionModelChange={handleRowSelection}
        className="bg-gray-100 shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />

      {/* MODAL */}
      <DeleteUserModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onDelete={handleDelete} />
      <CreateUserModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onCreate={handlecreateUser} />
      <UpdateUserModal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} onUpdate={handleupdateUser} user={selectedUser} />

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

export default Users;
