import React, { useState } from 'react';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      await axios.post('http://localhost:7777/upload', formData, {
        onUploadProgress: (progressEvent) => {
          console.log(progressEvent)
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          setProgress(percentCompleted);
        },
      });
      // await fileUpload()
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed!');
    } finally {
      setUploading(false);
      setProgress(0);
      setFile(null);
    }
  };

  return (
    <Box sx={{ width: '400px', margin: '20px auto', textAlign: 'center' }}>
      <input type="file" onChange={handleFileChange} /> 
      <Box mt={2}>
        <Button variant="contained" onClick={handleUpload} disabled={!file || uploading}>
          Upload
        </Button>
      </Box>
      {uploading && (
        <Box mt={2}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" sx={{ mt: 1 }}>
            {progress}%
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;
