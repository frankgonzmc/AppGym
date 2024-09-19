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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;