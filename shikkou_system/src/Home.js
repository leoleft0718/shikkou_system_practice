import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

const Home = () => {
    const [stuNum, setStuNum] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        window.alert(stuNum);
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        const regex = /^[0-9]*$/; // 半角数字の正規表現
        if (regex.test(value) && value.length <= 7) {
            setStuNum(value);
        }
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: "20px"
                }}>
                    <Typography variant="h5">出席・委任取り消し用ページ</Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: "50px",
                }}>
                    <TextField
                        label="学籍番号を入力してください"
                        variant="outlined"
                        value={stuNum}
                        onChange={handleInputChange}
                        sx={{ width: "400px" }}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: "50px",
                }}>
                    <Button variant="contained" onClick={handleClick}>送信</Button>
                </Box>
            </Box>
        </>
    );
}

export default Home;
