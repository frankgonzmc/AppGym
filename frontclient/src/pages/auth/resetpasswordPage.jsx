import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import '../../css/authPage.css';

function ResetpasswordPage() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(`/reset-password/${token}`, { password: data.password });
            setMessage(response.data.message);
            navigate('/');
        } catch (error) {
            setMessage(error.response?.data?.message || "Error al restablecer contraseña");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='seccion'>
            <div className="flex h-screen items-center justify-center">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-zinc-800 p-10 rounded-md">
                    <h2 className="text-white mb-4">Restablecer Contraseña</h2>
                    <input
                        type="password"
                        {...register('password', { required: true })}
                        placeholder="Nueva Contraseña"
                        required
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-2"
                    />
                    {errors.password && (<p className="text-red-500">Se requiere la nueva contraseña</p>)}

                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
                        {loading ? "Procesando..." : "Restablecer Contraseña"}
                    </button>
                    {message && <p className="text-red-500 mt-2">{message}</p>}
                </form>
            </div>
        </section>
    );
}

export default ResetpasswordPage;
