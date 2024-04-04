"use client"
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface User {
  accessToken: string;
  rut: string;
}

interface UserContextType {
  user: User | null;
  setUser: (newUser: User | null) => void; //
}

const initialUserContext: UserContextType = {
  user: null,
  setUser: () => {}
};

const UserContext = createContext<UserContextType>(initialUserContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Al cargar la página, intentamos cargar el usuario desde el almacenamiento local
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateUser = (newUser: User | null) => {
    // Al actualizar el usuario, también lo almacenamos en el almacenamiento local
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('user');
    }
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => useContext(UserContext);
