import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboardm from './Components/dashboard/Dashboard';
import DigimonFiltro from './Components/Digimon/DigimonFiltro';
import User from './Components/users/User';
import Home from './Components/Home/Home';
import DogList from './Components/Dog/DogList';
import CatBreedsView from './Components/Cat/CatBreedsView';
import CountriesView from './Components/countries/CountriesView';
import MusicRepro from './Components/Music/MusicRepro';
import YouTubeRepro from './Components/Youtube/YouTubeRepro';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboardm />}>
          <Route path="/inicio" element={<Home />} />
          <Route path="/digimon" element={<DigimonFiltro />} />
          <Route path="/usuario" element={<User />} />
          <Route path="/perro" element={<DogList />} />
          <Route path="/gato" element={<CatBreedsView />} />
          <Route path="/paises" element={<CountriesView />} />
          <Route path="/music" element={<MusicRepro />} />
          <Route path="/youtube" element={<YouTubeRepro />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
