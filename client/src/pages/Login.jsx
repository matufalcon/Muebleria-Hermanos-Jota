import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const API_BASE = process.env.REACT_APP_API_URL || '';

function Login() {
  const { login } = useAuth();
  const {formData, error, setError, loading, setLoading, handleChange} = useForm({
    email: "",
    password: ""
  });  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token);
        navigate("/"); 
      } else {
        setError(data.error || "Credenciales inválidas");
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
        <h2>Iniciar Sesión</h2>

        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
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
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="auth-msg">
          ¿No tenés cuenta?
          <Link to="/register"> Registrarse</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;