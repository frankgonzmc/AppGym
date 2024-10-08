import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authcontext';
import { RutinaProvider } from './context/rutinascontext';
import { EjercicioProvider } from './context/ejercicioscontext';
import { ProgresoProvider } from './context/progresocontext';
import { DetalleRutinaProvider } from './context/detallerutinacontext';
import { Inicio } from './pages/inicio';
import { LoginPage } from './pages/auth/loginPage';
import ProtectedRoute from './ProtectedRoute';
import ProfilePage from './pages/auth/profilePage';
import RegistroUsuario from './pages/auth/registerPage';
import RutinaPage from './pages/rutinas/rutinaPage';
import RutinaForm from './pages/rutinas/rutinaForm';
import Navbar from './components/navbar';
import ProgresoPage from './pages/progreso/progresoPage';
import EjercicioForm from './pages/ejercicios/ejercicioForm';
import DetallerutinaPage from './pages/rutinas/detallerutinaPage';
import CalendarPage from './pages/calendario/calendarPage';
import EjercicioPage from './pages/ejercicios/ejercicioPage';
import ResetpasswordPage from './pages/auth/resetpasswordPage';
import IniciarejercicioPage from './pages/ejercicios/iniciarejercicioPage';

function App() {
  return (
    <AuthProvider>
      <RutinaProvider>
        <DetalleRutinaProvider>
          <ProgresoProvider>
            <EjercicioProvider>
              <BrowserRouter>
                <Navbar />
                <Routes>
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/register' element={<RegistroUsuario />} />
                  <Route path='/forgot-password' element={<ResetpasswordPage />} />

                  <Route element={<ProtectedRoute />}>
                    <Route path='/' element={<Inicio />} />
                    <Route path='/profile' element={<ProfilePage />} />
                    <Route path='/inicio' element={<Inicio />} />

                    <Route path='/rutinas' element={<RutinaPage />} />
                    <Route path='/add-rutinas' element={<RutinaForm />} />
                    <Route path='/rutinas/:id' element={<RutinaForm />} />

                    <Route path='/progreso' element={<ProgresoPage />} />
                    <Route path='/progreso/:id' element={<ProgresoPage />} />

                    <Route path='/iniciar-ejercicios' element={<IniciarejercicioPage />} />
                    <Route path='/ejercicios' element={<EjercicioPage />} />
                    <Route path='/add-ejercicios' element={<EjercicioForm />} />
                    <Route path='/ejercicio/:id' element={<EjercicioForm />} />

                    <Route path='/detalles-rutinas/:id' element={<DetallerutinaPage />} />

                    <Route path='/calendar' element={<CalendarPage />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </EjercicioProvider>
          </ProgresoProvider>
        </DetalleRutinaProvider>
      </RutinaProvider>
    </AuthProvider>
  );
}

export default App;
