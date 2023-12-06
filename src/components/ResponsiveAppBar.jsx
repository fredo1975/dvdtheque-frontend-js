import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useKeycloak } from "@react-keycloak/web";
import { Link } from "react-router-dom";
import { useState } from 'react';

const pages = ['Liste des films', 'Ajout', 'Exporter', 'Importer', 'Admin'];

const ResponsiveAppBar = () =>  {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
        
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
        
    };

    const handleCloseNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const { keycloak, initialized } = useKeycloak();

    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static" color='primary' className='dark'>
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
                        <img src="assets/img/cd_dvd.png" alt="DVDTHEQUE" width="30" />
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
                                <Link to="/film-add" className="nav-link">Ajout</Link>
                            </Button>

                            <Button
                                key="exporter"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                                <Link to="/film-export" className="nav-link">Exporter</Link>
                            </Button>

                            <Button
                                key="importer"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                                <Link to="/film-import" className="nav-link">Importer</Link>
                            </Button>

                            <Button
                                key="admin"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                                <Link to="/admin" className="nav-link">Admin</Link>
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