/*
    Ruta: /api/login
*/

const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarComapos } = require('../middleware/validar-campos');

const router = Router();


router.post('/', [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La password es obligatoria').not().isEmpty(),
        validarComapos
    ],
    login
);




module.exports = router;