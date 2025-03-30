"use client";

import { useState } from "react";
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
import { Home } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const getTabValue = () => {
    switch (pathname) {
      case "/":
        return 0;
      case "/favorites":
        return 1;
      case "/campaigns":
        return 2;
      default:
        return false;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: 5,
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
              <img
                src="./assets/letreiro_punkzombie.png"
                alt="Punkzombie"
                style={{
                  height: "50px",
                  objectFit: "contain",
                  marginLeft: 15,
                }}
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
              component={Link}
              href="/"
              value={0}
              sx={{ height: 70 }}
              label="Fichas"
            />
            <Tab
              component={Link}
              href="/favorites"
              value={1}
              sx={{ height: 70 }}
              label="Favoritas"
            />
            <Tab
              component={Link}
              href="/campaigns"
              value={2}
              sx={{ height: 70 }}
              label="Campanhas"
            />
          </Tabs>
          <Box>
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
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: 64 }} />
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          <ListItem disablePadding>
            <ListItemButton>
              <Home sx={{ marginRight: 1 }} />
              <ListItemText primary="Página inicial" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <FavoriteIcon sx={{ marginRight: 1 }} />
              <ListItemText primary="Minhas Favoritas" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <CampaignIcon sx={{ marginRight: 1 }} />
              <ListItemText primary="Minhas Campanhas" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
