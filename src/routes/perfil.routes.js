import { Router } from "express";
import { createPerfil, getPerfiles, getPerfil } from '../controllers/perfil.controller.js';

const router = Router();

// Ruta para mostrar el formulario de creación de usuario
router.get('/perfiles/create', (req, res) => {
    res.render('perfiles/createPerfil'); 
});

// Ruta para manejar la creación de un nuevo usuario
router.post('/perfiles/create', createPerfil);

router.get('/perfiles', getPerfiles); // Obtener todos los perfiles
router.get('/perfiles/:id', getPerfil); // Obtener perfil por ID

export default router;
