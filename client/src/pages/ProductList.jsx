import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import '../ProductStyles.css';
import { useProducts } from '../hooks/useProducts';

function ProductList({ limit }) {
  // Hook personalizado maneja toda la lógica de fetch
  const { productos, loading, error } = useProducts();
  const { addItem } = useContext(CartContext);
  const productosAmostrar = typeof limit === 'number' && limit > 0 ? productos.slice(0, limit) : productos;
  const isHighlighted = typeof limit === 'number' && limit > 0;
  const cardButtonText = isHighlighted ? 'Ver Detalles' : 'Añadir al carrito';
  const useNavigation = isHighlighted;
  const gridId = isHighlighted ? 'productos-destacados-grid' : 'card-container';
  const sectionClass = isHighlighted ? 'destacados' : 'catalogo';
  const titleText = isHighlighted ? 'Nuestros Destacados' : 'Catálogo de nuestros productos';

  return (
    <section className={sectionClass} aria-busy={loading}>
      {isHighlighted ? (
        <div className="destacados__container">
          <h2 className="destacados__title section-title">{titleText}</h2>
          <div id={gridId} className="destacados__grid">
            {loading && <p>Cargando...</p>}
            {error && <p role="alert">{error}</p>}
            {!loading && !error && productosAmostrar.map((producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
                buttonText={cardButtonText}
                buttonAction={()=> addItem(producto)}
                useNavigation={useNavigation}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <h1 className="section-title">{titleText}</h1>
          <section id={gridId}>
            {loading && <p>Cargando...</p>}
            {error && <p role="alert">{error}</p>}
            {!loading && !error && productosAmostrar.map((producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
                buttonText={cardButtonText}
                buttonAction={()=> addItem(producto)}
                useNavigation={useNavigation}
              />
            ))}
          </section>
        </>
      )}
    </section>
  );
}

export default ProductList;
