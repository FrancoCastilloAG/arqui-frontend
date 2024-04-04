"use client"
import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useUser } from '../userContext';
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'


export default function Auth() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", rut: "" });
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const { setUser } = useUser();
  const router = useRouter()

  const handleLogin = async () => {
    try {
      console.log('Login Data:', loginData); // Imprimir los datos enviados a la API
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.statusCode === 200) {
          console.log("Ingreso exitoso");
          setUser({ accessToken: data.accessToken, rut: data.rut });
          router.push('/')
        } else {
          console.error('Error:', data);
        }
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleRegister = async () => {
    try {
      console.log('Register Data:', registerData); // Imprimir los datos enviados a la API
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      console.log('Register Response:', response);

      if (response.ok) {
        const data = await response.json();
        if (data.statusCode === 200) {
          console.log("Ingreso exitoso");
          setUser({ accessToken: data.accessToken, rut: data.rut });
          window.location.href = "/";
        } else {
          console.error('Error:', data);
        }
      } else {
        const data = await response.json();
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div>
        {showRegisterForm ? (
          <>
            <h2>Registro</h2>
            <Input label="Nombre" value={registerData.name} onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })} />
            <Input label="Email" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} />
            <Input label="Contraseña" type="password" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} />
            <Input label="RUT" value={registerData.rut} onChange={(e) => setRegisterData({ ...registerData, rut: e.target.value })} />
            <Button onClick={handleRegister}>Registrarse</Button>
            <p>¿Ya tienes una cuenta? <Button onClick={toggleForm}>Inicia sesión</Button></p>
          </>
        ) : (
          <>
            <h2>Iniciar sesión</h2>
            <Input label="Email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
            <Input label="Contraseña" type="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
            <Button onClick={handleLogin}>Iniciar sesión</Button>
            <p>¿No tienes una cuenta? <Button onClick={toggleForm}>Regístrate</Button></p>
          </>
        )}
      </div>
    </div>
  
  );
}
