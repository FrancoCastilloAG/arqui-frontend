"use client"
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";

export default function Auth() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });
  const [showRegisterForm, setShowRegisterForm] = useState(false);

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
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      {!showRegisterForm ? (
        <div>
          <h2>Login</h2>
          <Input
            type="email"
            label="Email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            placeholder="Enter your email"
          />
          <Input
            type="password"
            label="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            placeholder="Enter your password"
          />
          <Button onClick={handleLogin}>Login</Button>
          <p>Don't have an account? <Button onClick={toggleForm}>Register</Button></p>
        </div>
      ) : (
        <div>
          <h2>Register</h2>
          <Input
            type="text"
            label="Name"
            value={registerData.name}
            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
            placeholder="Enter your names"
          />
          <Input
            type="email"
            label="Email"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            placeholder="Enter your email"
          />
          <Input
            type="password"
            label="Password"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            placeholder="Enter your password"
          />
          <Button onClick={handleRegister}>Register</Button>
          <p>Already have an account? <Button onClick={toggleForm}>Login</Button></p>
        </div>
      )}
    </div>
  );
}