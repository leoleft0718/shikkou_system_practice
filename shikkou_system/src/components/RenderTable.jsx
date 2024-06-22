// RenderTable.js
import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const RenderTable = ({ data }) => (
  <Paper>
    <Box sx={{ width: '100%', margin: '0 auto' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {data.length > 0 && Object.keys(data[0]).map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(0, 10).map((row, index) => ( // 10行までに制限
              <TableRow key={index}>
                {Object.values(row).map((value, i) => (
                  <TableCell key={i}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </Paper>
);

export default RenderTable;
