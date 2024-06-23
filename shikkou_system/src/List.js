import React, { useState, useEffect } from "react";
import { Box, Typography, Tabs, Tab, TableContainer, Paper, Table } from "@mui/material";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase"; // 正しく初期化された 'db' をインポート

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function List() {
    const [members, setMembers] = useState([]);
    const [value, setValue] = useState(0);

    const collections = ["Gakuyukaiinn", "shussekisha", "gityoinin", "kojininin"];
    const defaultOrder = ['stu_id', 'firstname', 'lastname'];

    async function fetchMembers(collectionName) {
        const memCol = collection(db, collectionName);
        const memSnapshot = await getDocs(memCol);
        const memList = memSnapshot.docs.map(doc => doc.data());
        return memList;
    }

    function handleTabChange(e, newValue) {
        setValue(newValue);
    }

    useEffect(() => {
        async function loadMembers() {
            const membersData = await fetchMembers(collections[value]);
            setMembers(membersData);
        }
        loadMembers();
    }, [value]);

    const renderTableHeaders = () => {
        if (members.length > 0) {
            const keys = defaultOrder.concat(Object.keys(members[0]).filter(key => !defaultOrder.includes(key)));
            return keys.map((key, index) => (
                <TableCell key={index}>{key}</TableCell>
            ));
        }
        return null;
    };

    const formatCellValue = (value) => {
        if (value !== null && typeof value === 'object' && value.seconds && value.nanoseconds) {
            return new Date(value.seconds * 1000).toLocaleString();
        }
        return value;
    };

    const renderTableRows = () => {
        return members.map((member, rowIndex) => {
            const orderedValues = defaultOrder.concat(Object.keys(member).filter(key => !defaultOrder.includes(key)))
                .map(key => member[key]);

            return (
                <TableRow key={rowIndex}>
                    {orderedValues.map((value, cellIndex) => (
                        <TableCell key={cellIndex}>{formatCellValue(value)}</TableCell>
                    ))}
                </TableRow>
            );
        });
    };

    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                marginTop: '20px'
            }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', margin: "20px" }}>
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
                    <Table sx={{ width: 650 }} aria-label="学友会員">
                        <TableHead>
                            <TableRow>
                                {renderTableHeaders()}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderTableRows()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}
