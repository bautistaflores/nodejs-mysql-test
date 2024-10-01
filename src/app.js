import express from 'express'
import path from 'path';
import usuariosRoutes from './routes/usuarios.routes.js'
import indexRoutes from './routes/index.routes.js'
import perfilRoutes from './routes/perfil.routes.js';
import postsRoutes from './routes/posts.routes.js';

import { fileURLToPath } from 'url';

const app = express()

// Usar fileURLToPath para obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // Para manejar datos de formularios

// llamada a las rutas
app.use(indexRoutes)
app.use('/api', usuariosRoutes)
app.use('/perfiles', perfilRoutes)
app.use('/posts', postsRoutes)


export default app