'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '../data/navLinks';
import Image from 'next/image';
// import LoginLogoutButton from './Auth/LoginLogoutButton';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const NavBar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const path = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const menuRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setIsDrawerOpen(false);
    }
  };

  const setMenuRef = useCallback(
    (el: HTMLAnchorElement | null, index: number) => {
      menuRefs.current[index] = el;
    },
    []
  );

  const handleMenuKeyDown = (event: KeyboardEvent) => {
    const focusedIndex = menuRefs.current.findIndex(
      (el) => el === document.activeElement
    );

    if (event.code === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = (focusedIndex + 1) % menuRefs.current.length;
      menuRefs.current[nextIndex]?.focus();
    } else if (event.code === 'ArrowUp') {
      event.preventDefault();
      const prevIndex =
        (focusedIndex - 1 + menuRefs.current.length) % menuRefs.current.length;
      menuRefs.current[prevIndex]?.focus();
    } else if (event.code === 'Escape') {
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    if (isDrawerOpen) {
      document.addEventListener('keydown', handleMenuKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('keydown', handleMenuKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleMenuKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDrawerOpen]);

  return (
    <>
      <AppBar
        position="fixed"
        role="navigation"
        sx={{
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'inset 0 -1px 0 0 var(--accents-2)',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: { xs: '100%', lg: '95%' },
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label="InvestPulse Home"
            >
              <Image
                src="/investpulse.webp"
                alt="Investpulse logo"
                width={40}
                height={40}
                className="rounded-full"
                priority
              />
              <Typography
                variant="h6"
                component="div"
                sx={{ ml: 1, color: 'primary.main' }}
              >
                InvestPulse
              </Typography>
            </Link>

            <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
              {navLinks.map((navlink) => (
                <Button
                  key={navlink.href}
                  href={navlink.href}
                  sx={{
                    color:
                      path === navlink.href ? 'primary.main' : 'text.primary',
                    mx: 1,
                  }}
                >
                  {navlink.title}
                </Button>
              ))}
            </Box>

            <Box
              sx={{
                display: { xs: 'flex', lg: 'none' },
                color: 'black',
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
                tabIndex={0}
                sx={{ ml: 2 }}
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
          position: 'fixed',
          top: '56px',
          width: '100vw',
          bgcolor: 'background.paper',
          zIndex: 100,
          background: 'rgba(255, 255, 255)',
        }}
      >
        <List>
          {navLinks.map((navlink, index) => (
            <ListItem key={navlink.href}>
              <ListItemButton
                component={Link}
                href={navlink.href}
                onClick={toggleDrawer}
                ref={(el) => setMenuRef(el, index)}
              >
                {navlink.icon}
                <ListItemText primary={navlink.title} sx={{ ml: 2 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default NavBar;
