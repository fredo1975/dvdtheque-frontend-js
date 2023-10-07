import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useKeycloak } from "@react-keycloak/web";
import WelcomePage from "../pages/Homepage";
import SecuredPage from "../pages/Securedpage";
import AdbIcon from '@mui/icons-material/Adb';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

const pages = ['Liste des films', 'Ajout', 'Exporter', 'Admin'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const { keycloak, initialized } = useKeycloak();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>
                        <img src="src/assets/img/cd_dvd.png" alt="DVDTHEQUE" width="30" />
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                            <Button
                                key="liste"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                                <Link to="/" className="nav-link">Liste des films</Link>
                            </Button>

                            <Button
                                key="ajout"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                                <Link to="/secured" className="nav-link">Ajout</Link>
                            </Button>

                            <Button
                                key="exporter"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                                <Link to="/secured" className="nav-link">Exporter</Link>
                            </Button>

                            <Button
                                key="admin"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                                <Link to="/secured" className="nav-link">Admin</Link>
                            </Button>
                        </Box>
                    </Typography>

                    {!!keycloak.authenticated && (
                        <Button color="inherit" onClick={() => keycloak.logout()}>Logout ({keycloak.tokenParsed.preferred_username})</Button>
                    )}

                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default ResponsiveAppBar;