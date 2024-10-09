import { useAuth } from "../../context/authcontext";
import { useState, useEffect } from "react";
import profileImage from "../../imagenes/profileicono.png";

function ProfilePage() {
  const { user, updatePassword, updatePerfil } = useAuth();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState(user?.username || "");
  const [edad, setEdad] = useState(user?.edad || "");
  const [estatura, setEstatura] = useState(user?.estatura || "");
  const [peso, setPeso] = useState(user?.peso || "");
  const [nuevoEmail, setNuevoEmail] = useState(user.email || "");
  const [profileImg, setProfileImg] = useState(user.profileImage || profileImage);
  const [newProfileImage, setNewProfileImage] = useState(null); // Estado para la nueva imagen

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
      setSuccess("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [error, success]);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await updatePassword(password, newPassword);
      setSuccess("Contraseña actualizada con éxito");
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError("Error al actualizar la contraseña");
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!nombreCompleto || !edad || !estatura || !peso || !nuevoEmail) {
      setError("Todos los campos deben estar completos.");
      return;
    }

    // Verificar si hay cambios en el perfil
    const isEmailChanged = nuevoEmail !== user.email;
    const isProfileChanged =
      nombreCompleto !== user.username ||
      edad !== user.edad ||
      estatura !== user.estatura ||
      peso !== user.peso;

    if (!isEmailChanged && !isProfileChanged && !newProfileImage) {
      setError("No hay cambios para actualizar.");
      return;
    }

    // Si el email ha cambiado, verificar si ya existe
    if (isEmailChanged) {
      const emailExists = await checkEmailExists(nuevoEmail);
      if (emailExists) {
        setError("El email no está disponible. Por favor, elige otro.");
        return;
      }
    }

    const formData = new FormData();
    formData.append('username', nombreCompleto);
    formData.append('edad', edad);
    formData.append('estatura', estatura);
    formData.append('peso', peso);
    formData.append('email', nuevoEmail);
    if (newProfileImage) {
      formData.append('profileImage', newProfileImage); // Agregar la nueva imagen
    }

    try {
      await updatePerfil(formData);
      setSuccess("Perfil actualizado con éxito");
    } catch (error) {
      setError("Error al actualizar el perfil");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result);
        setNewProfileImage(file); // Guarda el archivo para enviarlo
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Sección de Perfil */}
      <section className="bg-zinc-800 p-6 rounded-md shadow-lg flex items-center justify-between mb-8">
        <div className="flex-1 text-white">
          <h2 className="text-3xl font-bold mb-4">Perfil de Usuario</h2>
          <form onSubmit={handleUpdateProfile}>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400">Nombre completo:</label>
                <input
                  type="text"
                  value={nombreCompleto}
                  onChange={(e) => setNombreCompleto(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded-md text-black"
                />
              </div>
              <div>
                <label className="block text-gray-400">Nuevo Email:</label>
                <input
                  type="email"
                  value={nuevoEmail}
                  onChange={(e) => setNuevoEmail(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded-md text-black"
                />
              </div>
              <div className="flex space-x-4">
                <div>
                  <label className="block text-gray-400">Edad:</label>
                  <input
                    type="number"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                    className="p-2 border border-gray-400 rounded-md text-black"
                  />
                </div>
                <div>
                  <label className="block text-gray-400">Estatura:</label>
                  <input
                    type="number"
                    value={estatura}
                    onChange={(e) => setEstatura(e.target.value)}
                    className="p-2 border border-gray-400 rounded-md text-black"
                  />
                </div>
                <div>
                  <label className="block text-gray-400">Peso:</label>
                  <input
                    type="number"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    className="p-2 border border-gray-400 rounded-md text-black"
                  />
                </div>
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Actualizar Perfil
            </button>
          </form>
        </div>
        {/* Imagen de perfil */}
        <div className="w-32 h-32">
          <img
            src={profileImg}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
          <input type="file" onChange={handleImageUpload} className="mt-2" />
        </div>
      </section>

      {/* Sección de Actualización de Contraseña */}
      <section className="bg-gray-700 p-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Actualizar Contraseña</h2>
        <form onSubmit={handlePasswordUpdate}>
          <div className="mb-6">
            <label className="block text-white">Contraseña actual:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-white">Nueva contraseña:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-white">Confirmar nueva contraseña:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Actualizar Contraseña
          </button>
        </form>
      </section>
    </div>
  );
}

export default ProfilePage;