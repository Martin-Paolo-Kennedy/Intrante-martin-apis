import { useState } from 'react';
import Digimon from '../Digimon/Digimon1';
import TextField from '@mui/material/TextField';

function DigimonFiltro() {
  const [input, setInput] = useState<string>('');
  const [searchBy, setSearchBy] = useState<'id' | 'name' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    // Verificar si la entrada es un número para decidir el tipo de búsqueda
    if (/^\d+$/.test(value)) {
      setSearchBy('id');
    } else {
      setSearchBy('name');
    }
  };

  return (
    <>
      <div className="App">
        <h1>Buscar Digimon</h1>
        <TextField
          type="text"
          onChange={handleInputChange}
          placeholder="Insertar ID o nombre del Digimon"
          id="filled-basic"
          label="Digimon ID o Nombre"
          variant="filled"
          value={input}
        />
        {searchBy === 'id' && <Digimon id={parseInt(input)} />}
        {searchBy === 'name' && <Digimon name={input} />}
      </div>
    </>
  );
}

export default DigimonFiltro;
