import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
// import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import { NavLink, useNavigate } from "react-router-dom";

import AdjustIcon from '@mui/icons-material/Adjust';
function Navbar({ user }) {

  const pages = user === "user" ? ["savdo", "savatcha"] : ['maxsulotlar', 'sotilganmaxsulotlar']

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigate = useNavigate();
  
  const clear = () => {
    localStorage.clear();
    navigate("/")
  }

  return (
    <AppBar position="static" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              letterSpacing: ".3rem",
              textDecoration: "none",
            }}
          >
            KORZINKA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <NavLink to={page}>
                    <Typography textAlign="center" sx={{ fontWeight: '900' }}>{page}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <LocalGroceryStoreIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            KORZINKA
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml:'5%', columnGap: 5 }}>
            {pages.map((page, index) => (
              <NavLink to={`/${page}`} style={{ textDecoration: 'none' }}>
                <Button
                  key={index}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2, color: "white",
                    display: "block", fontWeight: '900',
                    textTransform: "capitalize", fontStyle: 'oblique'
                  }}
                >
                  {page}
                </Button>
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Log Out">
              <IconButton onClick={() => clear()} sx={{ p: 0 }} href='/'>
                <AdjustIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
