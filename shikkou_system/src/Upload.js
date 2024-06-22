import { Button, Box, Typography, Grid, Alert, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import Papa from 'papaparse';
import RenderTable from './components/RenderTable';
import { setDoc, collection, doc } from 'firebase/firestore';
import { db } from './firebase';

function Upload() {
  const [gakuyukaiData, setGakuyukaiData] = useState([]);
  const [ininData, setIninData] = useState([]);
  const [gityoininData, setGityoininData] = useState([]);
  const [kojinininData, setKojinininData] = useState([]);
  const [uploadMessage, setUploadMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e, setData, isGakuyukai) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      Papa.parse(text, {
        header: false,
        complete: (result) => {
          const parsedData = result.data.map((row) => {
            if (isGakuyukai) {
              return {
                stu_id: parseInt(row[0], 10),
                firstname: row[1],
                lastname: row[2],
                update_at: new Date(),
              };
            } else {
              return {
                stu_id: parseInt(row[0], 10),
                is_gityoinin: parseInt(row[1], 10),
                inin_stu_id: row[2] ? parseInt(row[2], 10) : null,
                update_at: new Date(),
              };
            }
          });
          setData(parsedData);
        }
      });
    };
    reader.readAsText(file);
  };

  const makeIninData = async (gakuyukaiData, ininData) => {
    setIsUploading(true);
    setUploadMessage('');
    
    const filteredInindata = ininData.filter(inindata =>
      gakuyukaiData.some(gakuyukaidata => gakuyukaidata.stu_id === inindata.stu_id)
    );
    setIninData(filteredInindata);

    const gityoininData = filteredInindata
      .filter(data => data.is_gityoinin === 1)
      .map(data => {
        const gakuyukai = gakuyukaiData.find(gakuyukaidata => gakuyukaidata.stu_id === data.stu_id);
        return {
          stu_id: data.stu_id,
          firstname: gakuyukai.firstname,
          lastname: gakuyukai.lastname,
        };
      });

    const kojinininData = filteredInindata
      .filter(data => data.is_gityoinin === 0 &&
        gakuyukaiData.some(gakuyukaidata => data.inin_stu_id === gakuyukaidata.stu_id)
      )
      .map(data => {
        const gakuyukai = gakuyukaiData.find(gakuyukaidata => gakuyukaidata.stu_id === data.stu_id);
        return {
          stu_id: data.stu_id,
          firstname: gakuyukai.firstname,
          lastname: gakuyukai.lastname,
          inin_stu_id: data.inin_stu_id,
        };
      });

    setGityoininData(gityoininData);
    setKojinininData(kojinininData);

    await Promise.all([
      uploadToFirestore(gityoininData.map(data => ({ ...data, update_at: new Date() })), 'gityoinin' ),
      uploadToFirestore(kojinininData.map(data => ({ ...data, update_at: new Date() })), 'kojininin'),
      uploadToFirestore(gakuyukaiData.map(data => ({ ...data, update_at: new Date() })), 'Gakuyukaiinn'),
      uploadToFirestore(ininData.map(data => ({ ...data, update_at: new Date() })), 'inindata')
    ]);

    setIsUploading(false);
    setUploadMessage('アップロードしました');
  };

  const uploadToFirestore = async(uploadData, collectionName) => {
    const uploadPromises = uploadData.map(async (data) => {
      const setDataRef = doc(collection(db, collectionName), data.stu_id.toString());
      await setDoc(setDataRef, data);
    });
    await Promise.all(uploadPromises);
  };

  return (
    <div>
      <Typography variant='h5' sx={{ margin: 3 }}>学友会員・委任データアップロード</Typography>
      {isUploading && (
        <Alert severity="info" sx={{ mb: 3 }}>
          アップロードしています <CircularProgress size={20} />
        </Alert>
      )}
      {uploadMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {uploadMessage}
        </Alert>
      )}
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 5 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='body1' sx={{ margin: 3 }}>学友会員データをアップロード:</Typography>
            <Button component="label">
              <input type='file' accept='.csv' onChange={(e) => handleFileChange(e, setGakuyukaiData, true)} />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='body1' sx={{ margin: 3 }}>委任データをアップロード:</Typography>
            <Button component="label">
              <input type='file' accept='.csv' onChange={(e) => handleFileChange(e, setIninData, false)} />
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Button
        variant='contained'
        sx={{ display: 'block', margin: '0 auto', mt: 5 }}
        disabled={gakuyukaiData.length === 0 || ininData.length === 0 || isUploading}
        onClick={() => makeIninData(gakuyukaiData, ininData)}
      >
        アップロード
      </Button>
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 5 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: 'center' }}>
            {gakuyukaiData.length > 0 && (
              <Box sx={{ mt: 5 }}>
                <Typography variant='h6'>学友会員データ</Typography>
                <RenderTable data={gakuyukaiData.map(({ update_at, ...rest }) => rest)} />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: 'center' }}>
            {ininData.length > 0 && (
              <Box sx={{ mt: 5 }}>
                <Typography variant='h6'>委任データ</Typography>
                <RenderTable data={ininData.map(({ update_at, ...rest }) => rest)} />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 5 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: 'center' }}>
            {gityoininData.length > 0 && (
              <Box sx={{ mt: 5 }}>
                <Typography variant='h6'>議長委任データ</Typography>
                <RenderTable data={gityoininData} />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: 'center' }}>
            {kojinininData.length > 0 && (
              <Box sx={{ mt: 5 }}>
                <Typography variant='h6'>個人委任データ</Typography>
                <RenderTable data={kojinininData} />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Upload;
