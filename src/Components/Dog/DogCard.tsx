// src/components/DogCard.tsx
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface Dog {
  id: number;
  name: string;
  bred_for: string;
  breed_group: string;
  life_span: string;
  temperament: string;
  origin: string;
  reference_image_id: string;
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
}

interface DogCardProps {
  dog: Dog;
}

const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  return (
    <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
        alt={dog.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {dog.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Bred for: {dog.bred_for}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Breed Group: {dog.breed_group}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Life Span: {dog.life_span}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Temperament: {dog.temperament}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Origin: {dog.origin}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Weight: {dog.weight.imperial} lbs / {dog.weight.metric} kg
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Height: {dog.height.imperial} in / {dog.height.metric} cm
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DogCard;
