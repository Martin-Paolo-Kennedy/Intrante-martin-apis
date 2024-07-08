import React from 'react';

interface MusicPlayerProps {
  audioSrc: string | null;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ audioSrc }) => {
  if (!audioSrc) {
    return <div>No audio selected</div>;
  }

  return (
    <audio controls>
      <source src={audioSrc} type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default MusicPlayer;
