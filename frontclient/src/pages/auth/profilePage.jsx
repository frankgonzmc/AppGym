import { useAuth } from "../../context/authcontext";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import profileImage from "../../imagenes/profileicono.png";

function ProfilePage() {
  const { user, updatePassword, checkEmailExists, updatePerfil } = useAuth();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState(user?.username || "");
  const [edad, setEdad] = useState(user?.edad || "");
  const [objetivos, setObjetivos] = useState(user?.objetivos || "");
  const [estatura, setEstatura] = useState(user?.estatura || "");
  const [peso, setPeso] = useState(user?.peso || "");
  const [nuevoEmail, setNuevoEmail] = useState(user?.email || "");
  const [profileImg, setProfileImg] = useState(user?.profileImage || profileImage);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [genero, setGenero] = useState(user?.genero || ""); // Nuevo estado para el género


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
    if (!nombreCompleto || !edad || !objetivos || !estatura || !peso || !nuevoEmail || !genero) {
      setError("Todos los campos deben estar completos.");
      return;
    }

    const isEmailChanged = nuevoEmail !== user.email;
    const isProfileChanged =
      nombreCompleto !== user.username ||
      edad !== user.edad ||
      estatura !== user.estatura ||
      objetivos !== user.objetivos ||
      peso !== user.peso ||
      genero !== user.genero;

    if (!isEmailChanged && !isProfileChanged && !newProfileImage) {
      setError("No hay cambios para actualizar.");
      return;
    }

    if (isEmailChanged) {
      const emailExists = await checkEmailExists(nuevoEmail);
      if (emailExists) {
        setError("El email no está disponible. Por favor, elige otro.");
        return;
      }
    }

    const formData = new FormData();
    formData.append('username', nombreCompleto);
    formData.append('email', nuevoEmail);
    formData.append('edad', edad);
    formData.append('estatura', estatura);
    formData.append('objetivos', objetivos);
    formData.append('peso', peso);
    formData.append('genero', genero);
    if (newProfileImage) {
      formData.append('profileImage', newProfileImage);
    }

    try {
      await updatePerfil(formData);
      setSuccess("Perfil actualizado con éxito");
    } catch (error) {
      setError("Error al actualizar el perfil");
      //console.error(error); // Esto se puede eliminar en producción
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result);
        setNewProfileImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const objetivosOptions = [
    "Perder peso",
    "Ganar músculo",
    "Mantener peso",
    "Mejorar resistencia",
    "Aumentar flexibilidad"
  ];

  return (
    <section className="seccion">
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="mb-4">
              <Card.Header className="text-center bg-primary text-white">
                <h4>Perfil de Usuario</h4>
              </Card.Header>
              <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleUpdateProfile}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-black">Nombre Completo</Form.Label>
                    <Form.Control
                      type="text"
                      value={nombreCompleto}
                      onChange={(e) => setNombreCompleto(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-black">Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={nuevoEmail}
                      onChange={(e) => setNuevoEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Row className="mb-3">
                    <Col>
                      <Form.Label className="text-black">Edad</Form.Label>
                      <Form.Control
                        type="number"
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <Form.Label className="text-black">Estatura (cm)</Form.Label>
                      <Form.Control
                        type="number"
                        value={estatura}
                        onChange={(e) => setEstatura(e.target.value)}
                      />
                    </Col>

                    <Col>
                      <Form.Label className="text-black">Género</Form.Label>
                      <Form.Select
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                      >
                        <option value="">Seleccionar</option>
                        <option value="varon">Varon</option>
                        <option value="mujer">Mujer</option>
                        <option value="otro">Otro</option>
                      </Form.Select>
                    </Col>
                    <Col>
                      <Form.Label className="text-black">Peso (kg)</Form.Label>
                      <Form.Control
                        type="number"
                        value={peso}
                        onChange={(e) => setPeso(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-black">Objetivos</Form.Label>
                    <Form.Select
                      value={objetivos}
                      onChange={(e) => setObjetivos(e.target.value)}
                    >
                      <option value="">Seleccionar Objetivo</option>
                      {objetivosOptions.map((objetivo, index) => (
                        <option key={index} value={objetivo}>{objetivo}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Card.Body>
                    <Form.Group className="text-center">
                      <Form.Label className="text-black">Foto de Perfil</Form.Label>
                      <div className="mb-3 mt-3 d-flex justify-content-center">
                        <img
                          src={profileImg}
                          alt="Profile"
                          className="rounded-circle mb-2"
                          width="350"
                          height="350"
                        />
                      </div>
                      <Form.Control type="file" onChange={handleImageUpload} />
                    </Form.Group>
                  </Card.Body>
                  <Button type="submit" variant="primary" className="w-100">
                    Actualizar Perfil
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Header className="text-center bg-secondary text-white">
                <h4>Actualizar Contraseña</h4>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handlePasswordUpdate}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-black">Contraseña Actual</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-black">Nueva Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-black">Confirmar Nueva Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button type="submit" variant="secondary" className="w-100">
                    Actualizar Contraseña
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ProfilePage;
