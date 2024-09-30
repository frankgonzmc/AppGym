import { useAuth } from "../context/authcontext";
import { useState } from "react";

function ProfilePage() {
  const { user, updatePassword } = useAuth();
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
    } catch (err) {
      setError("Error al actualizar la contraseña");
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-3xl w-full p-6 rounded-md flex space-x-6">
        
        {/* Información del usuario */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6">Perfil de Usuario</h2>

          <div className="mb-6">
            <label className="block text-white">Nombre completo:</label>
            <input
              type="text"
              value={user.username}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white">Email:</label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white">Edad:</label>
            <input
              type="number"
              value={user.edad}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white">Estatura:</label>
            <input
              type="number"
              value={user.estatura}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white">Peso:</label>
            <input
              type="number"
              value={user.peso}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>
        </div>

        {/* Sección de actualización de contraseña */}
        <div className="flex-1 bg-gray-700 p-4 rounded-md">
          <h2 className="text-2xl font-bold mb-4">Actualizar Contraseña</h2>
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
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
