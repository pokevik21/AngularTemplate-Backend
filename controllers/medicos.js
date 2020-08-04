const { response } = require('express');
const Medico = require('../models/medico');
const Hostital = require('../models/hospital');


const getMedicos = async(req, res) => {

    try {

        const medicos = await Medico.find()
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img');

        res.json({
            ok: true,
            medicos
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


};

const crearMedico = async(req, res = response) => {

    try {

        const uid = req.uid;
        const hospi = req.body.hospital;

        if (!Hostital.findOne({ hospi })) {
            res.status(404).json({
                ok: false,
                msg: 'El Hospital ingresado no existe...'
            });
        }

        const newMedico = new Medico({
            usuario: uid,
            ...req.body
        });

        const medicoDB = await newMedico.save();

        res.json({
            ok: true,
            medicoCreado: medicoDB
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, en crearMedico... revisar logs'
        });
    }


};

const actualizarMedico = async(req, res = response) => {

    try {


        res.json({
            ok: true,
            msg: 'actualizar'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

};

const borrarMedico = async(req, res = response) => {

    try {

        res.json({
            ok: true,
            msg: 'actualizar'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, en borrarUsuario... revisar logs'
        });
    }


};

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
};