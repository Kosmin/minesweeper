import React, { memo } from 'react';
import { Switch, Route, Link, Redirect } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { GameScreen } from './features/GameScreen/GameScreen.container';
import './App.css';
import { HomeScreen } from './features/HomeScreen/HomeScreen.container';
import { ErrorBoundary } from './app/errorBoundary';
import { useAppSelector } from './app/hooks';
import { mapLayoutSelector } from './features/GameScreen/selectors';

export const App = memo(() => {
  interface IPagesType { [key: string]: string };
  const pages: IPagesType = {'Home': '/'};

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const mapLayout = useAppSelector(mapLayoutSelector);

  return (
    <ErrorBoundary>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              React Minesweeper
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {Object.keys(pages).map((pageName) => (
                  <MenuItem key={pageName}>
                    <Link
                      to={pages[pageName]}
                      key={pageName}
                      onClick={handleCloseNavMenu}
                    >
                      <Typography textAlign="center">{pageName}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              React Minesweeper
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {Object.keys(pages).map((pageName) => (
                <Link to={pages[pageName]} key={pageName} onClick={handleCloseNavMenu} style={{textDecoration: 'none'}}>
                  <Button key={pageName} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                    {pageName}
                  </Button>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path="/"><HomeScreen /></Route>
          {(!mapLayout || mapLayout.length <= 0) && (
            <Redirect to='/' />
          )}
          <Route path="/game"><GameScreen /></Route>
        </Switch>
      </Box>
    </ErrorBoundary>
  );
});

export default App;
