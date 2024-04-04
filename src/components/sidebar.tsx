"use client"
import React from "react";
import { useRouter } from 'next/navigation';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { FiSettings, FiUsers, FiLayers, FiList, FiHome } from "react-icons/fi";
import { useUser } from '../app/userContext';

export default function App() {
  const { user, setUser } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    // Limpiar los datos del usuario al cerrar sesión
    setUser(null);
    // Redirigir al usuario a la página de inicio de sesión
    router.push('/auth');
  };

  return (
    <Navbar style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', width: '200px', height: '100vh', backgroundColor: "#f0f0f0" }}>
      <NavbarContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px', width: '100%' }}>
        <NavbarBrand>
          <p className="font-bold text-inherit">Finanzas</p>
        </NavbarBrand>
        <NavbarItem>
          <Link href="/" isBlock color="foreground">
            <FiHome style={{ marginRight: '8px' }} /> Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/movimientos" isBlock color="foreground">
            <FiList style={{ marginRight: '8px' }} /> Movimientos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" isBlock color="foreground">
            <FiLayers style={{ marginRight: '8px' }} /> ?????
          </Link>
        </NavbarItem>
        <NavbarItem>
          <div>
            {user && user.rut && (
              <p>RUT: {user.rut}</p>
            )}
          </div>
        </NavbarItem>
        <NavbarItem>
          <Button color="danger" onClick={handleLogout}>Cerrar sesión</Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}




