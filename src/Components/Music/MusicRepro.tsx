import React, { useState } from 'react';
import MusicPlayer from './MusicPlayer';
import MusicUploader from './MusicUploader';
import { Container, Grid } from '@mui/material';

const MusicRepro: React.FC = () => {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    const fileURL = URL.createObjectURL(file);
    setAudioSrc(fileURL);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MusicUploader onFileSelect={handleFileSelect} />
        </Grid>
        <Grid item xs={12}>
          <MusicPlayer audioSrc={audioSrc} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MusicRepro;
