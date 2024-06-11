// AppBar.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function MyAppBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          執行受付システム
        </Typography>
        <Button color="inherit" component={Link} to="/">出席・委任取り消し</Button>
        <Button color="inherit" component={Link} to="/about">委任に変更</Button>
      
      </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;
