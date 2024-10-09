import { useAuth } from "../../context/authcontext";
import { useState, useEffect } from "react";

function ProfilePage() {
  const { user, updatePassword, updatePerfil } = useAuth(); // Agregamos la función para actualizar el perfil
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState(user?.username || ""); // Estado para nombre completo
  const [edad, setEdad] = useState(user?.edad || ""); // Estado para edad
  const [estatura, setEstatura] = useState(user?.estatura || ""); // Estado para estatura
  const [peso, setPeso] = useState(user?.peso || ""); // Estado para peso
  const [nuevoEmail, setNuevoEmail] = useState(user.email || "");

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await updatePassword(password, newPassword);
      setSuccess("Contraseña actualizada con éxito");
      setError("");
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

    // Verificar si el nuevo email ya existe
    const emailExists = await checkEmailExists(nuevoEmail);
    if (emailExists) {
      setError("El email* no disponible. Por favor, elige otro.");
      return;
    }

    try {
      await updatePerfil({ username: nombreCompleto, edad, estatura, peso, email: nuevoEmail });
      setSuccess("Perfil actualizado con éxito");
      setError("");
    } catch (error) {
      setError("Error al actualizar el perfil");
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
                  onChange={(e) => setNombreCompleto(e.target.value)} // Cambia el estado
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
                    onChange={(e) => setEdad(e.target.value)} // Cambia el estado
                    className="p-2 border border-gray-400 rounded-md text-black"
                  />
                </div>
                <div>
                  <label className="block text-gray-400">Estatura:</label>
                  <input
                    type="number"
                    value={estatura}
                    onChange={(e) => setEstatura(e.target.value)} // Cambia el estado
                    className="p-2 border border-gray-400 rounded-md text-black"
                  />
                </div>

                <div>
                  <label className="block text-gray-400">Peso:</label>
                  <input
                    type="number"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)} // Cambia el estado
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
            src={user.profileImage || { profileImage }}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
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
