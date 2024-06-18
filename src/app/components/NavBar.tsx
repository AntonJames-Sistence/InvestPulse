'use client';
import React, { useState } from "react";
import { navLinks } from "../data/navLinks";
import { GiHamburgerMenu } from "react-icons/gi";
import LoginButton from "./Auth/LoginButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Button, Typography, Box } from "@mui/material";
import Link from "next/link";

const NavBar: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const renderNavLinks = () => 
        navLinks.map((link, index) => (
            <MenuItem key={index} onClick={handleMenuClose} component="a" href={link.href}>
                {link.title}
            </MenuItem>
        ));
    

    return (
        <AppBar position="static" color="default">
            <Toolbar>
                <Box display="flex" alignItems="center">
                    <Link href="/" className="flex flex-center">
                        <img className="rounded-xl self-center h-[50px]" src="/koiny.jpeg" alt="Koiny logo" />
                        <Typography className="self-center" variant="h5" color="primary" component="p" sx={{ ml: 2, fontWeight: 'bold' }}>
                            KoinY
                        </Typography>
                    </Link>
                </Box>

                <Box flexGrow={1} />

                {isMobile ? (
                    <Box display="flex" alignItems="center">
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
                            <GiHamburgerMenu />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            {renderNavLinks()}
                        </Menu>
                    </Box>
                ) : (
                    <Box display="flex" alignItems="center">
                        {navLinks.map((link, index) => (
                            <Button key={index} href={link.href} sx={{ mx: 2 }} color="primary">
                                {link.title}
                            </Button>
                        ))}
                    </Box>
                )}

                <LoginButton />
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;