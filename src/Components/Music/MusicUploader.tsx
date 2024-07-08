import React from 'react';
import { Button } from '@mui/material';

interface MusicUploaderProps {
  onFileSelect: (file: File) => void;
}

const MusicUploader: React.FC<MusicUploaderProps> = ({ onFileSelect }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div>
      <input
        accept="audio/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span">
          Upload Music
        </Button>
      </label>
    </div>
  );
};

export default MusicUploader;
