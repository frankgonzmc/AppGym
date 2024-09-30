import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authcontext';
import { RutinaProvider } from './context/rutinascontext';
import { EjercicioProvider } from './context/ejercicioscontext';
import { HistorialProvider } from './context/historialcontext';
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
import DetallerutinaPage from './pages/detallerutinaPage';
import CalendarPage from './pages/calendarPage';
import EjercicioPage from './pages/ejercicioPage';
import ResetpasswordPage from './pages/resetpasswordPage';
import { ProgresoProvider } from './context/progresocontext';
import { DetalleRutinaProvider } from './context/detallerutinacontext';

function App() {
  return (
    <AuthProvider>
      <RutinaProvider>
        <DetalleRutinaProvider>
          <HistorialProvider>
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
                      <Route path='/rutina/:id' element={<RutinaForm />} />

                      <Route path='/historial' element={<HistorialPage />} />
                      <Route path='/historial/:id' element={<HistorialPage />} />

                      <Route path='/progreso' element={<ProgresoPage />} />
                      <Route path='/progreso/:id' element={<ProgresoPage />} />

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
          </HistorialProvider>
        </DetalleRutinaProvider>
      </RutinaProvider>
    </AuthProvider>
  );
}

export default App;
