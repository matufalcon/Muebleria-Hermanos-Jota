import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { useNavigate } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_URL || '';

function CrearProducto(){
    const {token} = useAuth();
    const navigate = useNavigate();
    const {formData, error, setError, loading, setLoading, handleChange, resetForm} = useForm({
        nombre: '', 
        descripcion: '', 
        precio: '', 
        imagenUrl: ''
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try{
        const response = await fetch(`${API_BASE}/api/productos`, {
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json',
                // El token JWT va en el header Authorization para que el backend
                // sepa que es un usuario autenticado con permisos de admin
                'Authorization': `Bearer ${token}`
            }, 
            body: JSON.stringify({
                nombre: formData.nombre, 
                descripcion: formData.descripcion, 
                precio: Number(formData.precio), 
                imagenUrl: formData.imagenUrl
            })
        });

        if(!response.ok){
            const data = await response.json();
            throw new Error(data.error || "Error al crear el producto");
        }
        
        resetForm();
        navigate('/products');
    } catch (err){
        setError(err.message || "Ocurrio un problema al crear el producto");
    } finally{
        setLoading(false)
    }
  };

  return (
    <div className="auth-wrapper" >
        <div className="auth-box">
            <h2>Crear nuevo producto</h2>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-input__wrapper">
                    <label className="auth-input__label">Nombre</label>
                    <input className="auth-input__field" type="text" name="nombre" value={formData.nombre} onChange={handleChange} required/>
                </div>
                
                <div className="auth-input__wrapper">
                    <label className="auth-input__label">Descripción</label>
                    <input className="auth-input__field" type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} required/>
                </div>

                <div className="auth-input__wrapper">
                    <label className="auth-input__label">Precio</label>
                    <input className="auth-input__field" type="number" name="precio" value={formData.precio} onChange={handleChange} min="0" required/>
                </div>

                <div className="auth-input__wrapper">
                    <label className="auth-input__label">Imagen (URL)</label>
                    <input className="auth-input__field" type="url" name="imagenUrl" value={formData.imagenUrl} onChange={handleChange} placeholder="https://ejemplo.com/imagen.jpg"/>  
                </div>

                <button id="boton_auth" type="submit" disabled={loading}>
                    {loading ? 'Creando...' : 'Crear producto'}
                </button>
            </form>
        </div>
    </div>
  );
}

export default CrearProducto;