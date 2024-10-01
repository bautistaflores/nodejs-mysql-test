import {pool} from '../db.js'

// Crea un nuevo perfil
export const createPerfil = async (req, res) => {
    const { descripcion, valoracionPromedio, telefono, email, nombre, apellido, fechaNacimiento, Usuario_idUsuario } = req.body;
    const [rows] = await pool.query(
        'INSERT INTO perfil (descripcion, valoracionPromedio, telefono, email, nombre, apellido, fechaNacimiento, Usuario_idUsuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
        [descripcion, valoracionPromedio, telefono, email, nombre, apellido, fechaNacimiento, Usuario_idUsuario])

        res.redirect('/api/perfiles/create');
};

// Devuelve todos los perfiles
export const getPerfiles = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM perfil');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener perfiles' });
    }
};

// Devuelve un perfil por ID
export const getPerfil = async (req, res) => {
    const { id } = req.params;
    
    try {
        const [rows] = await pool.query('SELECT * FROM perfil WHERE idPerfil = ?', [id]);
        
        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Perfil no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el perfil' });
    }
};
