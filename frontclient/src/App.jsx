import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authcontext';
import { Inicio } from './pages/inicio';
import { LoginPage } from './pages/loginPage';
import ProtectedRoute from './ProtectedRoute';
import ProfilePage from './pages/profilePage';
import RegistroUsuario from './pages/registerPage';
import RutinaPage from './pages/rutinaPage';
import RutinaForm from './pages/rutinaForm';
import Navbar from './components/navbar';
import ProgresoPage from './pages/progresoPage';
import HistorialPage from './pages/historialPage';

import EjercicioForm from './pages/ejercicioForm';
import EjerciciosPage from './pages/ejerciciosPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegistroUsuario />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Inicio />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/inicio' element={<Inicio />} />
            <Route path='/rutinas' element={<RutinaPage />} />
            <Route path='/add-rutinas' element={<RutinaForm />} />
            <Route path='/rutina/:id' element={<RutinaForm />} />


            <Route path='/historial' element={<HistorialPage />} />
            <Route path='/progresos' element={<ProgresoPage />} />
            <Route path='/ejercicios' element={<EjerciciosPage />} />
            <Route path='/add-ejercicios' element={<EjercicioForm />} />
            <Route path='/ejercicios/:id' element={<EjercicioForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;