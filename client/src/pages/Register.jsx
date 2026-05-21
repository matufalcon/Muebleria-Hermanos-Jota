import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const API_BASE = process.env.REACT_APP_API_URL || '';

function Register() {
  const {formData, error, setError, loading, setLoading, handleChange} = useForm({
    nombre: "",
    email: "",
    password: ""
  })
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError("");
    setLoading(true);

    try {
      // Paso 1: registrar
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if(!response.ok){
        setError(data.error || 'Error al registrar usuario');
        return;
      }
      // if (response.ok) {
      //   alert("Usuario registrado exitosamente");
      
      // Paso 2: login automático después del registro
      const loginResponse = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const loginData = await loginResponse.json();
      
      if (loginResponse.ok) {
        login(loginData.token);
        navigate("/"); 
      } else {
        // El registro funcionó pero el login automático falló
        navigate("/login")
      }
    } catch {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2>Crear Cuenta</h2>

        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-input__wrapper">
            <label className="auth-input__label">Nombre</label>
            <input
              className="auth-input__field"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
            />
          </div>

          <div className="auth-input__wrapper">
            <label className="auth-input__label">Email</label>
            <input
              className="auth-input__field"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@email.com"
              required
            />
          </div>

          <div className="auth-input__wrapper">
            <label className="auth-input__label">Contraseña</label>
            <input
              className="auth-input__field"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••"
              required
            />
          </div>

          <button id="boton_auth" type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p className="auth-msg">
          ¿Ya tenés cuenta?
          <Link to="/login"> Iniciar sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;