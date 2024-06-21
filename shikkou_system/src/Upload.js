import { Button, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

function Upload() {
  const [gakuyukaiData, setGakuyukaiData] = useState([]);
  const [ininData, setIninData] = useState([]);

  const handleFileChange = (e, setData) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      Papa.parse(text, {
        header: true,
        complete: (result) => {
          setData(result.data);
        }
      });
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    if (gakuyukaiData.length > 0) {
      console.log(gakuyukaiData);
    }
  }, [gakuyukaiData]);

  useEffect(() => {
    if (ininData.length > 0) {
      console.log(ininData);
    }
  }, [ininData]);

  const renderTable = (data) => (
    <Paper>
    <Box sx={{ width: '50%', margin: '0 auto' }}>
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

  return (
    <div>
      <Typography variant='h5' sx={{ margin: 3 }}>学友会員・委任データアップロード</Typography>
      <Box sx={{ display: 'flex', justifyContent: "center", mt: 5 }}>
        <Typography variant='body1' sx={{ margin: 3 }}>学友会員データをアップロード:</Typography>
        <Button component="label">
          <input type='file' accept='.csv' onChange={(e) => handleFileChange(e, setGakuyukaiData)} />
        </Button>
      </Box>
      {gakuyukaiData.length > 0 && (
        <Box sx={{ mt: 5 }}>
          <Typography variant='h6'>学友会員データ</Typography>
          {renderTable(gakuyukaiData)}
        </Box>
      )}
      <Box sx={{ display: 'flex', justifyContent: "center", mt: 5 }}>
        <Typography variant='body1' sx={{ margin: 3 }}>委任データをアップロード:</Typography>
        <Button component="label">
          <input type='file' accept='.csv' onChange={(e) => handleFileChange(e, setIninData)} />
        </Button>
      </Box>
      {ininData.length > 0 && (
        <Box sx={{ mt: 5 }}>
          <Typography variant='h6'>委任データ</Typography>
          {renderTable(ininData)}
        </Box>
      )}
    </div>
  );
}

export default Upload;
