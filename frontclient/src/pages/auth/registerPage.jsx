import React, { useState } from "react";
import { useAuth } from "../context/authcontext";
import { Form, Button } from "react-bootstrap";
import { ErrorAlert } from "../../components/alerts/errorAlert";

export default function RegisterPage() {
  const { signup, errors } = useAuth();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(user);
  };

  return (
    <div className="register-container">
      <h2 className="text-center">Crear una Cuenta</h2>
      <ErrorAlert errors={errors} /> {/* Muestra errores aquí */}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Ingresa tu email"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Ingresa tu contraseña"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Edad</Form.Label>
          <Form.Control
            type="number"
            name="age"
            onChange={handleChange}
            placeholder="Ingresa tu edad"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Género</Form.Label>
          <Form.Select name="gender" onChange={handleChange}>
            <option value="Varón">Varón</option>
            <option value="Mujer">Mujer</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4">
          Continuar Registro
        </Button>
      </Form>
    </div>
  );
}
