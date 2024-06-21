// AppBar.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

function MyAppBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">
            執行受付システム
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/">出席・委任取り消し</Button>
            <Button color="inherit" component={Link} to="/about">委任に変更</Button>
            <Button color="inherit" component={Link} to="/upload">アップロード</Button>
            <Button color="inherit" component={Link} to="/list">リスト</Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;
