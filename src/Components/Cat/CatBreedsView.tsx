import React, { useEffect, useState } from 'react';

interface CatBreed {
    weight: {
        imperial: string;
        metric: string;
    };
    id: string;
    name: string;
    temperament: string;
    origin: string;
    description: string;
    life_span: string;
    wikipedia_url: string;
    // Añadir más propiedades según sea necesario
}

const CatBreedsView: React.FC = () => {
    const [breeds, setBreeds] = useState<CatBreed[]>([]);

    useEffect(() => {
        const fetchCatBreeds = async () => {
            try {
                const response = await fetch('https://api.thecatapi.com/v1/breeds');
                if (!response.ok) {
                    throw new Error('Failed to fetch cat breeds');
                }
                const data: CatBreed[] = await response.json();
                setBreeds(data);
            } catch (error) {
                console.error('Error fetching cat breeds:', error);
            }
        };

        fetchCatBreeds();
    }, []);

    return (
        <div>
            <h1>Cat Breeds</h1>
            <ul>
                {breeds.map((breed) => (
                    <li key={breed.id}>
                        <h2>{breed.name}</h2>
                        <p><strong>Temperament:</strong> {breed.temperament}</p>
                        <p><strong>Origin:</strong> {breed.origin}</p>
                        <p><strong>Description:</strong> {breed.description}</p>
                        <p><strong>Life Span:</strong> {breed.life_span}</p>
                        <p><strong>Wikipedia URL:</strong> <a href={breed.wikipedia_url} target="_blank" rel="noopener noreferrer">{breed.wikipedia_url}</a></p>
                        {/* Renderizar más propiedades según necesites */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CatBreedsView;
