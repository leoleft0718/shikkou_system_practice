import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Paper, Tabs, Tab } from "@mui/material";
import { getDocs, collection } from "firebase/firestore/lite";
import { db } from "./firebase"; // dbの初期化が正しく行われていることを確認してください

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

                    {/* <TabPanel value={value} index = {0}></TabPanel>
                */}
                {/* {members.length > 0 ? (
                    members.map((member, index) => (
                //         <Box key={index} sx={{ margin: '10px' }}>
                //             <Typography variant="body1">
                //                 {JSON.stringify(member)}
                //             </Typography>
                //         </Box>
                //     ))
                // ) : (
                //     <Typography variant="body1">
                //         No members found.
                //     </Typography> */}
                // )}
            </Box>
        </>
    );
}
