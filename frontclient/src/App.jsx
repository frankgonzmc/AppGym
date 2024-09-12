import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authcontext';
import { Inicio } from './pages/inicio';
import { LoginPage } from './pages/loginPage';
import profilePage from './pages/profilePage';
import RegistroUsuario from './pages/registerPage';
import rutinaPage from './pages/rutinaPage';
import rutinaForm from './pages/rutinaForm';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1>Home pageeeeeeeennnnn </h1>} />
          <Route path='/profile' element={<profilePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegistroUsuario />} />
          <Route path='/inicio' element={<Inicio />} />
          <Route path='/rutinas' element={<rutinaPage/>} />
          <Route path='/add-rutinas' element={<rutinaForm />} />
          <Route path='/rutina/:id' element={<rutinaForm />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;