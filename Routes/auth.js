/*
    Ruta: /api/login
*/

const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();


router.post('/', [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La password es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login
);


router.post('/google', [
        check('token', 'El token de google es obligatoria').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
);




module.exports = router;