import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Inicio } from './pages/inicio';
import { LoginPage } from './pages/loginPage';
import RegistroUsuario from './pages/registerPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Home pageeeeeeeennnnn </h1>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegistroUsuario />} />
        <Route path='/inicio' element={<Inicio />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;