import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Inicio} from './pages/inicio.jsx';
import {Home} from './components/login';
import { Registro } from './components/register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Home page </h1>} />
        <Route path='/login' element={<Home/>} />
        <Route path='/register' element={<Registro/>} />
        <Route path='/inicio' element={<Inicio/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;