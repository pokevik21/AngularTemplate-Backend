const { response } = require('express');
const Hospital = require('../models/hospital');


const getHospitales = async(req, res) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    });
};

const crearHospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });


    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospitalCreado: hospitalDB
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


};

const actualizarHospital = async(req, res = response) => {

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

const borrarHospital = async(req, res = response) => {

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
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
};