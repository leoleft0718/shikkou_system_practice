import React, { useState, useEffect } from "react";
import { Box, Typography, Tabs, Tab, TableContainer, Paper, Table } from "@mui/material";
import { getDocs, collection } from "firebase/firestore/lite";
import { db } from "./firebase"; // Make sure to properly initialize 'db'

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function List(){
    const [members, setMembers] = useState([]);
    const [value, setValue] = useState(0);

    async function fetchMembers(db) {
        const memCol = collection(db, "Gakuyukaiinn");
        const memSnapshot = await getDocs(memCol);
        const memList = memSnapshot.docs.map(doc => doc.data());
        return memList;
    }

    function handleTabChange(e, newValue){
        setValue(newValue);
    }

    useEffect(() => {
        async function loadMembers() {
            const membersData = await fetchMembers(db);
            setMembers(membersData);
        }
        loadMembers();
    }, []);

    return(
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                marginTop: '20px'
            }}>
                <Typography variant="h4" gutterBottom>
                    Gakuyukaiinn Members
                </Typography>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' , margin:"20px"}}>
                    <Tabs
                        value={value}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="学友会員" />
                        <Tab label="出席者" />
                        <Tab label="議長委任" />
                        <Tab label="個人委任" />
                    </Tabs>
                </Box>

                <TableContainer component={Paper}>
                    <Table sx={{width:650}} aria-label="学友会員">
                        <TableHead>
                            <TableRow>
                                <TableCell>学籍番号</TableCell>
                                <TableCell>名前</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {console.log(members)}
                            {members.map((member, index) => (
                                <TableRow key={index}>
                                    <TableCell>{member.stu_id}</TableCell>
                                    <TableCell>{member.firstname} {member.lastname}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}
