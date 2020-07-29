/*
    Ruta: /api/usuario
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarComapos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const {
    getUsuario,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
} = require('../controllers/usuario');



const router = Router();

router.get('/', validarJWT, getUsuario);

router.post(
    '/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La password es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarComapos

    ],
    crearUsuario
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarComapos
    ],
    actualizarUsuario);

router.delete('/:id', validarJWT, borrarUsuario);

module.exports = router;