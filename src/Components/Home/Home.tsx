import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const Home: React.FC = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Bienvenido a la página de inicio
            </Typography>
            <Typography variant="body1">
                Esta es una página de ejemplo utilizando Material-UI.
            </Typography>
            <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Botón de Ejemplo
            </Button>
        </Container>
    );
};

export default Home;
