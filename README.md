# Mueblería Hermanos Jota

E-commerce de mueblería artesanal desarrollado con el stack MERN. Este repositorio es un **refactor personal** del [proyecto grupal original](https://github.com/Corcholog/Muebleria-Hermanos-Jota) realizado durante el curso de desarrollo FullStack - ITBA 2025.

El objetivo fue reescribir y mejorar el frontend en profundidad: corregir bugs críticos, aplicar patrones de React modernos y rediseñar la interfaz manteniendo la identidad visual de la marca.

---

## ¿Qué se mejoró respecto al original?

El proyecto original tenía varios problemas que se identificaron y corrigieron:

**Bugs funcionales**
- El carrito se vaciaba al recargar la página (no había persistencia)
- El estado de autenticación tenía tres variables independientes que podían quedar en valores inconsistentes, causando fallas intermitentes en el login
- Componentes recibían funciones del carrito como props desde `App.jsx` cuando ya existía un contexto para eso (prop drilling innecesario)
- `CrearProducto.jsx` tenía la URL del fetch vacía y llamaba una función inexistente, por lo que nunca funcionó

**Arquitectura**
- Se eliminó el prop drilling de `App.jsx`: los componentes ahora consumen `CartContext` y `AuthContext` directamente
- El `AuthContext` se simplificó a un único estado (`token`), del cual `user` e `isAuthenticated` se derivan, haciendo imposible los estados inconsistentes
- Se agregó persistencia del carrito en `localStorage` con inicialización lazy y sincronización automática via `useEffect`

**Custom hooks**
- `useAuth` — acceso centralizado al contexto de autenticación
- `useCart` — acceso centralizado al contexto del carrito
- `useForm` — manejo genérico de formularios (estado, errores, loading, reset)
- `useToast` — sistema de notificaciones visuales
- `useProducts` / `useProduct` — fetch de productos con AbortController
- `useProductUtils` / `useFormattedPrice` — formateo y utilidades de productos

**UX**
- Toasts de feedback al iniciar sesión, cerrar sesión, registrarse y agregar productos al carrito
- El carrito persiste entre recargas y sesiones
- Validación de contraseñas en el registro (confirmación + longitud mínima)
- Rutas protegidas con `PrivateRoute` (la ruta de administración requiere autenticación)
- Redirección automática al login cuando se intenta acceder a rutas protegidas

**Interfaz**
- Navbar rediseñado: compacto (60px), tipografía DM Sans, indicador de ruta activa con línea dorada, badge del carrito, estado de usuario autenticado con iniciales
- Sidebar rediseñado: overlay para cerrar, iconos SVG, link activo, acciones de auth integradas
- Cards de producto unificadas con header, bloque de precio destacado y dos acciones claras
- Carrito con layout limpio, controles de cantidad y resumen de compra
- Paleta y tipografía consistentes en toda la app (`Playfair Display` para títulos, `DM Sans` para cuerpo)

---

## Stack tecnológico

**Frontend**
- React 18
- React Router v6
- Context API + custom hooks
- CSS modular (sin frameworks de UI)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT para autenticación
- Arquitectura en capas: routes → controllers → repositories → schemas

---

## Estructura del proyecto

```
├── backend/
│   ├── server.js
│   └── src/
│       ├── controllers/
│       ├── middlewares/
│       ├── persistencia/
│       │   ├── models/
│       │   ├── repositories/
│       │   └── schemas/
│       └── routes/
└── client/
    └── src/
        ├── components/      # Navbar, Sidebar, Cart, ProductCard, PrivateRoute
        ├── context/         # AuthContext, CartContext, ToastContext
        ├── hooks/           # useAuth, useCart, useForm, useToast, useProducts, useProductUtils
        └── pages/           # Home, ProductList, ProductDetail, Cart, Login, Register, CrearProducto
```

---

## Instalación local

Requiere Node.js y una base de datos MongoDB (local o Atlas).

```bash
# Clonar el repositorio
git clone https://github.com/matufalcon/Muebleria-Hermanos-Jota.git
cd Muebleria-Hermanos-Jota
```

**Backend**
```bash
cd backend
npm install
```

Creá un archivo `.env` en la carpeta `backend`:
```
PORT=3001
MONGODB_URI=tu_uri_de_mongodb
JWT_SECRET=tu_secreto_jwt
```

```bash
npm run dev
```

**Frontend**
```bash
cd client
npm install
```

Creá un archivo `.env` en la carpeta `client`:
```
REACT_APP_API_URL=http://localhost:3001
```

```bash
npm start
```

La app queda disponible en `http://localhost:3000`.

---

## Proyecto original

Refactor del trabajo grupal realizado en el curso de Full Stack. 
El repositorio original está disponible en [Corcholog/Muebleria-Hermanos-Jota](https://github.com/Corcholog/Muebleria-Hermanos-Jota).

---

## Autor

**Matías Leiva Falcón**  
Analista Programador Universitario  
[github.com/matufalcon](https://github.com/matufalcon)
