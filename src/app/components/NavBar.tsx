"use client";

import React, { useState } from "react";
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
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NavBar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const path = usePathname();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      toggleDrawer();
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        role="navigation"
        sx={{
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(229, 231, 235, 0.5)",
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
              width={50}
              height={50}
              className="rounded-xl"
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
                startIcon={navlink.icon}
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
                onKeyDown={handleKeyDown}
                tabIndex={0}
              >
                {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Collapse
        in={isDrawerOpen}
        sx={{
          mt: "57px",
          position: "fixed",
          width: "100vw",
          bgcolor: "background.paper",
          zIndex: 100,
        }}
      >
        <List>
          {navLinks.map((navlink) => (
            <ListItem key={navlink.href}>
              <ListItemIcon sx={{ minWidth: 0 }}>{navlink.icon}</ListItemIcon>
              <ListItemButton
                component={Link}
                href={navlink.href}
                onClick={toggleDrawer}
              >
                <ListItemText primary={navlink.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default NavBar;
