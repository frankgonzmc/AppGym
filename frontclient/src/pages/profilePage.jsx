import { useAuth } from "../context/authcontext";
import { useState } from "react";

function ProfilePage() {
  const { user, updatePassword } = useAuth(); // Obtener el usuario y la función de actualizar contraseña
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
      await updatePassword(password, newPassword); // Llamar a la función del contexto
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
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Perfil de Usuario</h2>

      <div className="mb-6">
        <label className="block text-gray-700">Nombre completo:</label>
        <input
          type="text"
          value={user?.name || "Nombre no disponible"}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          value={user?.email || "Email no disponible"}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <form onSubmit={handlePasswordUpdate}>
        <div className="mb-6">
          <label className="block text-gray-700">Contraseña actual:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Nueva contraseña:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Confirmar nueva contraseña:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
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
  );
}

export default ProfilePage;
