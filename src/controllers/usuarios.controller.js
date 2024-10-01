import {pool} from '../db.js'

// Devuelve todos los usuarios
export const getUsuarios = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM usuario')
    res.send(rows)
}

// Devuelve un usuario por ID
export const getUsuario = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM usuario WHERE idUsuario = ?', [req.params.id])
    
    if (rows.length <= 0 ) return res.status(404).json({
        message: 'Usuario not found'
    })

    res.json(rows[0])
}

// Crea un usuario
export const createUsuario = async (req, res) => {
    const{nombreUsuario, contraseña} = req.body
    const [rows] = await pool.query('INSERT INTO usuario (nombreUsuario, contraseña) VALUES (?, ?)', [nombreUsuario, contraseña])
    // res.send({
    //     idUsuario: rows.insertId,
    //     nombreUsuario,
    //     contraseña
    // })
    res.redirect('/api/usuarios/create');
}

// Actualiza un usuario
export const updateUsuario = async (req, res) => {
    const {id} = req.params
    const {nombreUsuario, contraseña} = req.body 

    const [result] = await pool.query('UPDATE usuario SET nombreUsuario = IFNULL(?, nombreUsuario), contraseña = IFNULL(?, contraseña) WHERE idUsuario = ?', [nombreUsuario, contraseña, id])

    if(result.affectedRows <= 0) return res.status(404).json({
        message: 'Usuario not found'
    })

    const [rows] = await pool.query('SELECT * FROM usuario WHERE idUsuario = ?', [id])

    res.json(rows[0])
}

// Elimina un usuario
export const deleteUsuario = async (req, res) => {
    const [result] = await pool.query('DELETE FROM usuario WHERE idUsuario = ?', [req.params.id])

    if(result.affectedRows <= 0) return res.status(404).json({
        message: 'Not found'
    })

    res.sendStatus(204)
}