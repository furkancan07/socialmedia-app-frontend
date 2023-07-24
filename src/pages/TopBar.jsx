import { AppBar, Button, ButtonGroup, Container, Grid, Stack, Toolbar, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import UploadIcon from '@mui/icons-material/Upload';
import LogoutIcon from '@mui/icons-material/Logout';


import React from 'react'
import { Link } from 'react-router-dom';


const TopBar = ({ name, cikis }) => {
  const cikisYap=() => {
    cikis(false);
    
  }
  return (
     <AppBar color="default" position="static">
  <Grid container justifyContent="space-between" alignItems="center">
    <Button color='primary' startIcon={<HomeIcon />}>
      <Link  className="link-topbar" to={'/home'}>
        AnaSayfa
      </Link>
    </Button>
    <Grid item>
      <Button startIcon={<AccountCircleIcon />}>
        <Link className="link-topbar" to={'/profil'}>
          {name}
        </Link>
      </Button>
      <Button startIcon={<SettingsIcon />}>
        <Link className="link-topbar" to={'/home'}>
          Ayarlar
        </Link>
      </Button>
      <Button startIcon={<UploadIcon />}>
        <Link className="link-topbar" to={'/postAdd'}>
          Paylaş
        </Link>
          </Button>
          <Button onClick={cikisYap} startIcon={<LogoutIcon />}>
        <Link className="link-topbar" to={'/login'}>
          Çıkış
        </Link>
      </Button>
    </Grid>
  </Grid>
</AppBar>
  )
}

export default TopBar
