import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from '../api/axios'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        setLoading(true);

        try {
            const response = await axios.post('/forgot-password', { email: data.email });
            setMessage(response.data.message);
            setEmail(''); // Limpiar el campo de email
        } catch (error) {
            setMessage(error.response ? error.response.data.message : "Error en la solicitud");
        } finally {
            setLoading(false); // Ocultar carga
        }
    });


    return (
        <div className="flex h-screen items-center justify-center">
            <form onSubmit={onSubmit} className="bg-zinc-800 p-10 rounded-md">
                <h2 className="text-white mb-4">Recuperar Contraseña</h2>
                <input
                    type="email"
                    {...register('email', { required: true })}
                    placeholder="Ingresa tu correo"
                    required
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-2"
                />
                {errors.email && (<p className="text-red-500"> Email es Necesario! </p>)}

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
                    {loading ? "Enviando..." : "Enviar enlace de recuperación"}
                </button>
                {message && <p className="text-red-500 mt-2">{message}</p>}
            </form>
        </div>
    );
};

export default ForgotPassword;
