const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {


        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            res.status(404).json({
                ok: false,
                msg: 'Error, email no existe.'
            });
        }

        // Verifica cantraseña
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validarPassword) {
            res.status(400).json({
                ok: false,
                msg: 'Error, la contraseña no es valida.'
            });
        }

        //generar token
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        res.json({
            ok: false,
            msg: 'Error al login, cunsulta al adminestador.'
        });
    }

};



module.exports = {
    login
};