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
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NavBar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const path = usePathname();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid hsla(0, 0%, 92%, 1)",
        }}
      >
        <Toolbar>
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
              >
                {navlink.title}
              </Button>
            ))}
          </Box>

          <LoginLogoutButton />

          <Box sx={{ display: { xs: "flex", lg: "none" }, ml: 'auto', color: "black" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Collapse
        in={isDrawerOpen}
        sx={{
          mt: 3,
          position: "fixed",
          width: "100vw",
          bgcolor: "background.paper",
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
