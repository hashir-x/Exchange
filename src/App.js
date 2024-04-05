import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Coins from './components/Coins';
import CoinDetails from './components/CoinDetails';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/coins' element={<Coins/>} />
      <Route path='/coins/:id' element={<CoinDetails/>}/>
    </Routes>
    </>
  );
}

export default App;
