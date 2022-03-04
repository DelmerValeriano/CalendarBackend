const {response} = require('express');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');
const Usuario = require('../models/Usuario');




const crearUsuario =async(req,res =response)=>{


    const {email,password} = req.body;

    try {
        
        let usuario =await Usuario.findOne({email});
        if (usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'Un Usuario ya existe con este correo'
            })
        }
        //le asigno una nueva instancia a la variable usuario
        usuario = new Usuario(req.body);

        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password =bcrypt.hashSync(password,salt);

    
        await usuario.save();

        //generar JWT

        const token = await generarJWT(usuario.id,usuario.name);
        
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name:usuario.name,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Por favor hablen con el administrador'
        })
        
    }


}


const loginUsuario = async(req,res =response)=>{

    const {email,password} = req.body;

    try {

        const usuario =await Usuario.findOne({email});

        if (!usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'Un Usuario no existe con este email'
            })
        }
        
        //confirmar los password para saber si son iguales

        const validPassword = bcrypt.compareSync(password,usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok:false,
                msg: 'La contraseña incorrecta'
            })
        }

        //generar token para
        const token = await generarJWT(usuario.id,usuario.name);

            
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        })
        
    }
    
}

const revalidarToken =async(req,res =response)=>{

    const uid =req.uid;
    const name =req.name;

    // generar un nuevo jwt
    const token = await generarJWT(uid,name);

    res.json({
        ok: true,
       token

    })
}



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}