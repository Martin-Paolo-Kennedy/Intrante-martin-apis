import React, { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import YouTubeLinkInput from './YouTubeLinkInput';
import YouTubePlayer from './YouTubePlayer';

const YouTubeRepro: React.FC = () => {
  const [videoId, setVideoId] = useState<string | null>(null);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          YouTube Music Player
        </Typography>
        <YouTubeLinkInput onVideoIdChange={setVideoId} />
        {videoId && <YouTubePlayer videoId={videoId} />}
      </Box>
    </Container>
  );
};

export default YouTubeRepro;
