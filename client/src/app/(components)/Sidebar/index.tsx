"use client";
import { Archive, BookOpenText, Clipboard, Layout, LucideIcon, Mail, Menu, ShoppingCart, SlidersHorizontal, Truck, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useGetLoginInfoQuery } from "@/state/api";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({ href, icon: Icon, label, isCollapsed }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname === "/" && href === "/dashboard");
  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        } hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${isActive ? "bg-blue-200 text-white" : ""}`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span className={`${isCollapsed ? "hidden" : "block"} font-medium text-gray-700`}>{label}</span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  const { data: userData } = useGetLoginInfoQuery();
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const userTypeId = userData?.userTypeId;

  const renderLinks = () => {
    switch (userTypeId) {
      case 1:
        return (
          <>
            <SidebarLink href="/dashboard" icon={Layout} label="Tablero" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/inventory" icon={Archive} label="Inventario" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/products" icon={Clipboard} label="Productos" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/purchases" icon={ShoppingCart} label="Realizar pedido" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/orders" icon={Truck} label="Pedidos" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/sales" icon={Mail} label="Realizar solicitud" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/requests" icon={BookOpenText} label="Solicitudes" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/users" icon={User} label="Usuarios" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/settings" icon={SlidersHorizontal} label="Configuraciones" isCollapsed={isSidebarCollapsed} />
          </>
        );
      case 2:
        return (
          <>
            <SidebarLink href="/dashboard" icon={Layout} label="Tablero" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/inventory" icon={Archive} label="Inventario" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/products" icon={Clipboard} label="Productos" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/purchases" icon={ShoppingCart} label="Realizar pedido" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/settings" icon={SlidersHorizontal} label="Configuraciones" isCollapsed={isSidebarCollapsed} />
          </>
        );
      case 3:
        return (
          <>
            <SidebarLink href="/dashboard" icon={Layout} label="Tablero" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/orders" icon={Truck} label="Pedidos" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/settings" icon={SlidersHorizontal} label="Configuraciones" isCollapsed={isSidebarCollapsed} />
          </>
        );
      case 4:
        return (
          <>
            <SidebarLink href="/dashboard" icon={Layout} label="Tablero" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/sales" icon={Mail} label="Realizar solicitud" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/requests" icon={BookOpenText} label="Solicitudes" isCollapsed={isSidebarCollapsed} />
            <SidebarLink href="/settings" icon={SlidersHorizontal} label="Configuraciones" isCollapsed={isSidebarCollapsed} />
          </>
        );
      default:
        return null;
    }
  };

  const sidebarClassnames = `fixed flex flex-col ${isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"} bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;
  return (
    <div className={sidebarClassnames}>
      {/* TOP LOGO */}
      <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8  ${isSidebarCollapsed ? "px-5" : "px-8"}`}>
        <Image src="/logo.png" alt="logo" width={80} height={80} className="rounded w-10" />
        <h1 className={`font font-extrabold text-2xl ${isSidebarCollapsed ? "hidden" : "block"}`}>FARMACO PEDIDOS</h1>
        {/*MENU BUTTON*/}
        <button className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100" onClick={toggleSidebar}>
          <Menu className="w-4 h-4" />
        </button>
      </div>
      {/* LINKS */}
      <div className="flex-grow mt-8">{renderLinks()}</div>
      {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className={`text-center text-xs text-gray-500`}>&copy; 2024 FARMACO-PEDIDOS</p>
      </div>
    </div>
  );
};

export default Sidebar;
