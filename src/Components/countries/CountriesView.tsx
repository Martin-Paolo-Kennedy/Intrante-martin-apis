import React, { useEffect, useState } from 'react';

interface Country {
    name: {
        common: string;
        official: string;
    };
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
}

const CountriesView: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags');
                if (!response.ok) {
                    throw new Error('Failed to fetch countries');
                }
                const data: Country[] = await response.json();
                setCountries(data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    return (
        <div>
            <h1>Countries</h1>
            <ul>
                {countries.map((country, index) => (
                    <li key={index}>
                        <h2>{country.name.common}</h2>
                        <p><strong>Official Name:</strong> {country.name.official}</p>
                        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} style={{ maxWidth: '100px' }} />
                        {country.flags.alt && <p><strong>Flag Description:</strong> {country.flags.alt}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CountriesView;
