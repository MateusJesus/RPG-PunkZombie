"use client";

import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CampaignIcon from "@mui/icons-material/Campaign";
import { AccountCircle, ExitToApp, Home } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const getTabValue = () => {
    switch (pathname) {
      case "/":
        return 0;
      case "/campaigns":
        return 2;
      default:
        return false;
    }
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          zIndex: 10,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ left: 10 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography>
              <Image
                src="/assets/letreiro_punkzombie.png"
                alt="Letreiro PunkZombie"
                width={1500}
                height={400}
                style={{ width: "auto", height: "50px", marginLeft: "15px" }}
                priority
              />
            </Typography>
          </Box>
          <Tabs
            value={getTabValue()}
            aria-label="Navigation Tabs"
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab
              sx={{ height: 64 }}
              component={Link}
              href="/"
              value={0}
              label="Fichas"
            />
            {/* <Tab
              component={Link}
              href="/favorites"
              value={1}
              sx={{ height: 70 }}
              label="Favoritas"
            /> */}
            <Tab
              component={Link}
              href="/campaigns"
              value={2}
              label="Campanhas"
            />
          </Tabs>
          <Box>
            {!user ? (
              <>
                <Link href={"/login"}>
                  <Button variant="text" color="inherit" sx={{ ml: 2 }}>
                    Entrar
                  </Button>
                </Link>
                <Link href={"/sign-in"}>
                  <Button variant="contained" color="secondary" sx={{ ml: 1 }}>
                    Criar Conta
                  </Button>
                </Link>
              </>
            ) : (
              <Link
                href={"/profile"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "200",
                  fontFamily: "20px",
                  gap: "5px",
                }}
              >
                <span>{user.displayName}</span>
                <AccountCircle />
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: 64 }} />
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List
          sx={{
            width: 250,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Link href={"/ficha"}>
            <ListItem disablePadding>
              <ListItemButton>
                <Home sx={{ marginRight: 1 }} />
                <ListItemText primary="Criar ficha" />
              </ListItemButton>
            </ListItem>
          </Link>
          <ListItem disablePadding>
            <ListItemButton>
              <FavoriteIcon sx={{ marginRight: 1 }} />
              <ListItemText primary="Minhas Favoritas" />
            </ListItemButton>
          </ListItem>
          <Link href={"/config-campaign"}>
            <ListItem disablePadding>
              <ListItemButton>
                <CampaignIcon sx={{ marginRight: 1 }} />
                <ListItemText primary="Criar Campanha" />
              </ListItemButton>
            </ListItem>
          </Link>

          {user && (
            <ListItem disablePadding sx={{ mt: "auto" }}>
              <ListItemButton onClick={logout}>
                <ExitToApp sx={{ color: "var(--error)", marginRight: 1 }} />
                <ListItemText sx={{ color: "var(--error)" }} primary="Sair" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
    </Box>
  );
}
