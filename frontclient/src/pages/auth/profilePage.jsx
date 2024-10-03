import { useAuth } from "../../context/authcontext";
import { useState, useEffect } from "react";

function ProfilePage() {
  const { user, updatePassword } = useAuth(); // Agregamos una función para obtener los ejercicios del usuario
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


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

  return (
    <div className="container mx-auto p-6">
      {/* Sección de Perfil */}
      <section className="bg-zinc-800 p-6 rounded-md shadow-lg flex items-center justify-between mb-8">
        <div className="flex-1 text-white">
          <h2 className="text-3xl font-bold mb-4">Perfil de Usuario</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400">Nombre completo:</label>
              <input
                type="text"
                value={user.username}
                readOnly
                className="w-full p-2 border border-gray-400 rounded-md text-black"
              />
            </div>

            <div>
              <label className="block text-gray-400">Email:</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full p-2 border border-gray-400 rounded-md text-black"
              />
            </div>

            <div className="flex space-x-4">
              <div>
                <label className="block text-gray-400">Edad:</label>
                <input
                  type="number"
                  value={user.edad}
                  readOnly
                  className="p-2 border border-gray-400 rounded-md text-black"
                />
              </div>

              <div>
                <label className="block text-gray-400">Estatura:</label>
                <input
                  type="number"
                  value={user.estatura}
                  readOnly
                  className="p-2 border border-gray-400 rounded-md text-black"
                />
              </div>

              <div>
                <label className="block text-gray-400">Peso:</label>
                <input
                  type="number"
                  value={user.peso}
                  readOnly
                  className="p-2 border border-gray-400 rounded-md text-black"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Imagen de perfil 
        <div className="w-32 h-32">
          <img
            src={user.profileImage || "/default-profile.png"}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>*/}
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