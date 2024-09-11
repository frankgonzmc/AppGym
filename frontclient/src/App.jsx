import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authcontext';
import { Inicio } from './pages/inicio';
import { LoginPage } from './pages/loginPage';
import RegistroUsuario from './pages/registerPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1>Home pageeeeeeeennnnn </h1>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegistroUsuario />} />
          <Route path='/inicio' element={<Inicio />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;