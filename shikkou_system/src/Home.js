import React from "react";
import { Box, Typography, Grid, TextField, Button } from "@mui/material";

const Home = () => {
    return (
        <>
        <Box sx={{flexGrow:1}}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt:"20px"
                }}>
                    <Typography variant="h5">出席・委任取り消し用ページ</Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt:"50px",
                }}>
                    <TextField label="学籍番号を入力してください" variant="outlined" sx={{width:"400px"}}/>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt:"50px",
                }}>
                    <Button variant="contained">送信</Button>
                </Box>

        </Box>
        </>
    )
}

export default Home;