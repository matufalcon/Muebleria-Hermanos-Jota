import React, { useContext } from "react";
import '../ProductStyles.css';
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from '../hooks/useProducts';
import { useFormattedPrice } from '../hooks/useProductUtils';
import { CartContext } from "../context/CartContext";

function ProductDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const { addItem } = useContext(CartContext);

  // Hook personalizado maneja toda la lógica de fetch
  const { producto, loading, error } = useProduct(id);
 
  // Hook para formatear precio 
  const precioFormateado = useFormattedPrice(producto?.precio);

  const volver = () => {
    navigate('/products'); 
  };

  if (loading) {
    return (
      <main className="producto-detalle">
        <p>Cargando producto...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="producto-detalle">
        <h1>Error</h1>
        <p className="error-message" role="alert">{error}</p>
        <button type="button" onClick={volver} className="btn-detalle">← Volver al catálogo</button>
      </main>
    );
  }

  if (!producto) {
    return (
      <main className="producto-detalle">
        <h1>Error</h1>
        <p className="error-message">Producto no encontrado.</p>
        <button type="button" onClick={volver} className="btn-detalle">← Volver al catálogo</button>
      </main>
    );
  }

  return (
    <main className="producto-detalle">
      <h1 id="product-title" className="section-title">{producto.nombre}</h1>

      <button type="button" onClick={volver} id="btn-back" className="btn-detalle">
        ← Volver al catálogo
      </button>

      <article id="product-details" className="detalle-container">
        <figure id="product-img">
          <img src={producto.imagen} alt={producto.nombre} />
          <p className="precio">${precioFormateado}</p>
        </figure>

        <section id="product-info">
          <h2>Detalles del producto</h2>
          {producto.detalles && Object.entries(producto.detalles).map(([key, value]) => (
            <div className="detail" key={key}>
              <span>{key}:</span> {value}
            </div>
          ))}

          <button type="button" className="btn-cart" onClick={() => addItem(producto)}>
            Añadir al Carrito
          </button>
        </section>
      </article>
    </main>
  );
}

export default ProductDetail;

