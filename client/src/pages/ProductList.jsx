import React from 'react';
import ProductCard from '../components/ProductCard';
import '../ProductStyles.css';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';

function ProductList({ limit }) {
  // Hook personalizado maneja toda la lógica de fetch
  const { productos, loading, error } = useProducts();
  const { addItem } = useCart();

  const productosAmostrar = typeof limit === 'number' && limit > 0 ? productos.slice(0, limit) : productos;
  
  const isHighlighted = typeof limit === 'number' && limit > 0;
  const gridId = isHighlighted ? 'productos-destacados-grid' : 'card-container';
  const sectionClass = isHighlighted ? 'destacados' : 'catalogo';
  const titleText = isHighlighted ? 'Nuestros Destacados' : 'Catálogo de nuestros productos';

  return (
    <section className={sectionClass} aria-busy={loading}>
      {isHighlighted ? (
        <div className="destacados__container">
          <h2 className="section-title">{titleText}</h2>
          <div id={gridId} className="destacados__grid">
            {loading && <p>Cargando...</p>}
            {error && <p role="alert">{error}</p>}
            {!loading && !error && productosAmostrar.map((producto) => (
              <ProductCard
                key={producto._id || producto.id}
                producto={producto}
                buttonAction={addItem}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <h2 className="section-title">{titleText}</h2>
          <section id={gridId}>
            {loading && <p>Cargando...</p>}
            {error && <p role="alert">{error}</p>}
            {!loading && !error && productosAmostrar.map((producto) => (
              <ProductCard
                key={producto._id || producto.id}
                producto={producto}
                buttonAction={addItem}
              />
            ))}
          </section>
        </>
      )}
    </section>
  );
}

export default ProductList;
