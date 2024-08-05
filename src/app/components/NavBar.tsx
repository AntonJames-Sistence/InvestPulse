"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "../data/navLinks";
import Image from "next/image";
import LoginLogoutButton from "./Auth/LoginLogoutButton";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NavBar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const path = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleMenuButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter") { // Doesn't work, should fix this later
      toggleDrawer();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setIsDrawerOpen(false);
    }
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    if (isDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyPress);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    }
  }, [isDrawerOpen])

  return (
    <>
      <AppBar
        position="fixed"
        role="navigation"
        sx={{
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(10px)",
          boxShadow: "inset 0 -1px 0 0 var(--accents-2)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "5rem",
            }}
          >
            <Image
              src="/koiny.webp"
              alt="KoinY logo"
              width={40}
              height={40}
              className="rounded-full"
              priority
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ ml: 1, color: "primary.main" }}
            >
              KoinY
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" } }}>
            {navLinks.map((navlink) => (
              <Button
                key={navlink.href}
                href={navlink.href}
                sx={{
                  color:
                    path === navlink.href ? "primary.main" : "text.primary",
                  mx: 1,
                  
                }}
              >
                {navlink.title}
              </Button>
            ))}
          </Box>

          <Box display="flex">
            <LoginLogoutButton />

            <Box
              sx={{
                display: { xs: "flex", lg: "none" },
                color: "black",
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
                onKeyDown={handleMenuButtonKeyDown}
                tabIndex={0}
                sx={{ml: 2}}
              >
                {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Collapse
        in={isDrawerOpen}
        ref={navRef}
        sx={{
          position: "fixed",
          top: "56px",
          width: "100vw",
          bgcolor: "background.paper",
          zIndex: 100,
          background: "rgba(255, 255, 255)",
        }}
      >
        <List>
          {navLinks.map((navlink) => (
            <ListItem key={navlink.href}>
              <ListItemButton
                component={Link}
                href={navlink.href}
                onClick={toggleDrawer}
              >
                {navlink.icon}
                <ListItemText primary={navlink.title} sx={{ml: 2}} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default NavBar;
