import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface YouTubeLinkInputProps {
  onVideoIdChange: (videoId: string) => void;
}

const YouTubeLinkInput: React.FC<YouTubeLinkInputProps> = ({ onVideoIdChange }) => {
  const [link, setLink] = useState('');

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const videoId = extractVideoId(link);
    if (videoId) {
      onVideoIdChange(videoId);
    } else {
      alert('Invalid YouTube link');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        label="YouTube Link"
        variant="outlined"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        sx={{ marginRight: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Play
      </Button>
    </Box>
  );
};

export default YouTubeLinkInput;
