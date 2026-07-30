import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormattedPrice } from '../hooks/useProductUtils';
import '../ProductStyles.css'

function ProductCard({ producto, buttonAction }) {
  const navigate = useNavigate();
  const precioFormateado = useFormattedPrice(producto.precio);

  const goToDetail = () => navigate(`/products/${producto._id || producto.id}`);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    buttonAction?.(producto);
  };

  return (
    <article className="card">
      <div className="card__header">
        <span>{producto.nombre}</span>
      </div>

      <div className="card__img-area">
        <img src={producto.imagen} alt={producto.nombre} loading="lazy" />
      </div>

      <div className="card__body">
        <div className="card__price-block">
          <div className="card__price-label">precio</div>
          <div className="card__price-value">${precioFormateado}</div>
        </div>

        <div className="card__actions">
          <button type="button" className="btn-detalle" onClick={goToDetail}>
            Ver detalles
          </button>
          <button type="button" className="btn-carrito" onClick={handleAddToCart}>
            Añadir a carrito
          </button>
        </div>

      </div>
    </article>
  );
}

export default ProductCard;