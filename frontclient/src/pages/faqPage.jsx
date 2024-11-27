import React, { useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import '../css/faqPage.css';

function FaqPage() {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        mensaje: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/faq-supporting', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccessMessage('¡Gracias por tu mensaje! Te responderemos pronto.');
                setFormData({ nombre: '', correo: '', mensaje: '' });
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Hubo un problema al enviar tu mensaje.');
            }
        } catch (error) {
            setErrorMessage('Error al enviar el formulario. Verifica tu conexión a internet.');
        }
    };

    return (
        <section className="seccion">
            <Card className="p-4">
                <h1 className="text-center">Preguntas Frecuentes (FAQ)</h1>
                <h2>¿Qué es App Gym?</h2>
                <p>
                    App Gym es una aplicación web que te ayuda a mejorar tus habilidades y llevar una vida más saludable.
                    Explora nuestras recomendaciones de ejercicios y disfruta de una experiencia única.
                </p>
                <hr className="my-4" />
                <h2 className="mt-4">¿Tienes preguntas o sugerencias?</h2>
                <p>Envíanos tus comentarios y sugerencias. ¡Nos encantaría saber de ti!</p>

                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="nombre" className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa tu nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="correo" className="mb-3">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Ingresa tu correo electrónico"
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="mensaje" className="mb-3">
                        <Form.Label>Mensaje</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Escribe tu mensaje"
                            name="mensaje"
                            value={formData.mensaje}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Enviar
                    </Button>
                </Form>
            </Card>
        </section>
    );
}

export default FaqPage;
