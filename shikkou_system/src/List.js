import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { getDoc, collection } from "firebase/firestore/lite";
import { db, app } from "./firebase"

export default function List(){
    async function getfirebase(db){
        const memCol = collection(db, "Gakuyukaiinn");
        const memSnapshot = await getDoc(memCol);
        return memSnapshot
    }
    console.log(getfirebase())
    return(
        <>
            
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
               
            </Box>
        </>
    )
}