import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Image {
    href: string;
    transparent: boolean;
}

interface Level {
    id: number;
    level: string;
}

interface Type {
    id: number;
    type: string;
}

interface Attribute {
    id: number;
    attribute: string;
}

interface Field {
    id: number;
    field: string;
    image: string;
}

interface Description {
    origin: string;
    language: string;
    description: string;
}

interface Skill {
    id: number;
    skill: string;
    translation: string;
    description: string;
}

interface Evolution {
    id: number;
    digimon: string;
    condition: string;
    image: string;
    url: string;
}

interface DigimonData {
    id: number;
    name: string;
    xAntibody: boolean;
    images: Image[];
    levels: Level[];
    types: Type[];
    attributes: Attribute[];
    fields: Field[];
    releaseDate: string;
    descriptions: Description[];
    skills: Skill[];
    priorEvolutions: Evolution[];
    nextEvolutions: Evolution[];
}

interface DigimonProps {
    id?: number;
    name?: string;
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Digimon: React.FC<DigimonProps> = ({ id, name }) => {
    const [expanded, setExpanded] = React.useState(false);
    const [digimon, setDigimon] = useState<DigimonData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        const fetchDigimon = async () => {
            try {
                let url: string;
                if (name) {
                    url = `https://digi-api.com/api/v1/digimon/${name}`;
                } else if (id) {
                    url = `https://digi-api.com/api/v1/digimon/${id}`;
                } else {
                    throw new Error('ID or Name must be provided');
                }

                const response = await axios.get(url);
                if (response.status !== 200) {
                    throw new Error('Digimon not found');
                }

                const data: DigimonData = response.data;
                setDigimon(data);
                setLoading(false);
                setError(null);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Ocurrió un error desconocido');
                }
                setLoading(false);
            }
        };

        fetchDigimon();
    }, [id, name]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Card sx={{ maxWidth: 345, marginTop: 10, margin: 'auto' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={`ID: ${digimon?.id}`}
                    subheader={`Digimon: ${digimon?.name}`}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={digimon?.images[0].href}
                    alt={digimon?.name}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {digimon?.types.map(type => (
                            <p key={type.id}>{type.type}</p>
                        ))}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>X-Antibody:</Typography>
                        <Typography paragraph>
                            {digimon?.xAntibody ? 'Yes' : 'No'}
                        </Typography>
                        <Typography paragraph>Nivel:</Typography>
                        <Typography paragraph>
                            {digimon?.levels.map(level => (
                                <p key={level.id}>{level.level}</p>
                            ))}
                        </Typography>
                        <Typography paragraph>Atributo:</Typography>
                        <Typography paragraph>
                            {digimon?.attributes.map(attribute => (
                                <p key={attribute.id}>{attribute.attribute}</p>
                            ))}
                        </Typography>
                        <Typography paragraph>Campos:</Typography>
                        <Typography paragraph>
                            {digimon?.fields.map(field => (
                                <div key={field.id} className="col text-center">
                                    <img src={field.image} alt={field.field} className="img-fluid" />
                                    <p>{field.field}</p>
                                </div>
                            ))}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
            <Card sx={{ minWidth: 275, marginBottom: 10, marginTop: 10 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Descripción
                    </Typography>
                    <Typography variant="body2">
                        {digimon?.descriptions.map(description => (
                            <p key={description.origin}>
                                <strong>{description.language}:</strong> {description.description}
                            </p>
                        ))}
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 275, marginBottom: 10 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Habilidades
                    </Typography>
                    <Typography variant="body2">
                        {digimon?.skills.map(skill => (
                            <p key={skill.id}>
                                <strong>{skill.skill}:</strong> {skill.description}
                            </p>
                        ))}
                    </Typography>
                </CardContent>
            </Card>
            <h2>Evoluciones Anteriores</h2>
            <Grid container spacing={3}>
                {digimon?.priorEvolutions.map(evolution => (
                    <Grid item key={evolution.id} xs={12} sm={6} md={4} lg={3}>
                        <Card sx={{ maxWidth: 500 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    sx={{ height: '100%', objectFit: 'cover' }}
                                    image={evolution.image}
                                    alt={evolution.digimon}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {evolution.digimon}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <h2>Próximas Evoluciones</h2>
            <Grid container spacing={3}>
                {digimon?.nextEvolutions.map(evolution => (
                    <Grid item key={evolution.id} xs={12} sm={6} md={4} lg={3}>
                        <Card sx={{ maxWidth: 500 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    sx={{ height: '100%', objectFit: 'cover' }}
                                    image={evolution.image}
                                    alt={evolution.digimon}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {evolution.digimon}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Digimon;
