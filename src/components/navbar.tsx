"use client"
import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";

export default function Example() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/productos" aria-current="page">
            Productos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/contacto">
            Contacto
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href={item}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}